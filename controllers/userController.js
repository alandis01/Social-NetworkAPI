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
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID found!' })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err)
            });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('__v')
        .populate('thoughts')
        .populate('friends')
        .then((users) => res.json (users))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    

}


module.export = userController;