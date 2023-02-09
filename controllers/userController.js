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
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID found!' })
                    : Thought.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true },
                    )
            )
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'This user has been deleted with no thoughts found related' })
            :res.json({ message: 'User sucesfully deleted!' })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true },
        )
        .then ((user) => 
        !user
        ?res.status(404).json({ message: 'No user with this ID found'})
        : res.json(user)
        )
        .catch((err) => {
            res.status(500).json(err)
        });
    },

    

}


module.export = userController;