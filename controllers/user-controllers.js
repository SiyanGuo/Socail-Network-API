const { User, Thought } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: '-__v'
                }
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404.).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(deletedUser => {
                if (!deletedUser) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                return Thought.deleteMany({ username: deletedUser.username })
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                res.json({ message: 'User and associated thoughts deleted!' });
                return;
            })
            .catch(err => res.status(400).json(err))
    },

    addFriend({ params, body }, res) {
        User.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ messge: 'No user found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    deleteFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.friendId })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'No friend found with this id!' })
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { friends: params.friendId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;