const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for your group!'],
    },
    description: {
      type: String,
      default: '',
    },
    photoUri: {
      type: String,
      default: '',
    },
    groupRuns: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'GroupRun',
        default: [],
      },
    ],
    groupMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  { versionKey: false }
);

groupSchema.pre(/^find/, function (next) {
  this.populate('groupMembers');

  next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
