const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts (req, res) {
        Thought.find()
        .select('__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id:req.body.userID },
                { $push: { thoughts: thought_id } },
                { new: true }
            );
        })
    }

}

module.exports = thoughtController;