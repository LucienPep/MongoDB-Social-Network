const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

//Though schema exported out so to be visible in user model, uses reaction schema.
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [
      Reaction
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual to show how many reactions the thought associated has attached to it.
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;