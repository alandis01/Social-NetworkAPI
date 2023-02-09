const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find()
        .select('__v')
        .populate('thoughts')
        .populate('friends')
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch ((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },


}


module.export = userController;