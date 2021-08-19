const mongoose = require('mongoose');

const groupRunSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
    runners: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    location: {
      type: String,
    },
    date: {
      type: Date,
    },
    groupRunData: {
      type: mongoose.Schema.ObjectId,
      ref: 'GroupRunData',
    },
  },
  { versionKey: false }
);

const GroupRun = mongoose.model('GroupRun', groupRunSchema);

module.exports = GroupRun;
