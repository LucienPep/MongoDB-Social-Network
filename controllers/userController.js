const { User, Thought } = require('../models');

//exports for User methods
module.exports = {
//Get method for all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// et mothod for getting one user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 //create new user with required field
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json({ message: 'User Created' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
//update method by id to change any details about a pre existing user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 //delete user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User Deleted' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
//add friend method to add a friend to two users, this is linked so both users add each other
  async addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true })
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User With Matching ID' })
          : res.json({ message: 'Added Friend' })
      )
      .catch((err) => res.status(500).json(err));
  },
//delete friend method deletes friendship for both users 
  async deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      ))
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User With Matching ID' })
          : res.json({ message: 'Deleted Friend' })
      )
      .catch((err) => res.status(500).json(err));
  },
};

