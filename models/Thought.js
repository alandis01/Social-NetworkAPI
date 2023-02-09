const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thougthSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            defauolt: Date.now(),
            get: value => value.toDateString()
        },
        username: {
            type: String,
            required: true 
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

thougthSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions?.length;
    });

    const Thought = model('thought', thougthSchema);

    module.exports = Thought; 