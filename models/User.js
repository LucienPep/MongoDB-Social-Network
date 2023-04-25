const { Schema, model } = require('mongoose');

//User schema uses it's self as an export for the availability of friend and also imports thoughts data that will be assigned to the user when created
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter valid email']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual to show total number of friends that user has assigned to them.
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })


const User = model('user', userSchema);

module.exports = User;
