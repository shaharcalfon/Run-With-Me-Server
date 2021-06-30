const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for your group!'],
  },
  groupCreator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  groupRuns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'GroupRun',
    },
  ],
  groupMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const User = mongoose.model('Group', groupSchema);

module.exports = Group;
