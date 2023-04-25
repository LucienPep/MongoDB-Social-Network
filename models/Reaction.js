const { Schema, Types } = require('mongoose');

//reaction schema only used for adding to thoughts and not to be created separately 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    //as a new ID is been declared an id doesn't need to be automatically assigned
    id: false
  }
);

module.exports = reactionSchema;