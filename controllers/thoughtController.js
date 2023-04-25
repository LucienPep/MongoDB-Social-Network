const { Thought, User } = require('../models');

//Export for Thought routes used by the server
module.exports = {
  //get method for all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
  },
//get method for one thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create method used for creating new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { userName: req.body.userName },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({message: 'No User with that username'})
      }

      res.json('Thought Posted');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //update thought method to add or correct any data inside a pre existing thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //delete method to delete thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove(
        { _id: req.params.thoughtId },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect Thought ID' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'User Does Not Exist',
        });
      }

      res.json({ message: 'Thought Deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add reaction to thought by ID
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect ID' });
      }

      res.json({ message: 'Reaction Added' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete reaction from thought by ID for both thought and reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect Reaction ID' });
      }

      res.json({ message: 'Reaction Deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
