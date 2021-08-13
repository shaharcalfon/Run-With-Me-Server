const mongoose = require('mongoose');

const groupRunSchema = new mongoose.Schema(
  {
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
      default: [],
    },
  },
  { versionKey: false }
);

const GroupRun = mongoose.model('GroupRun', groupRunSchema);

module.exports = GroupRun;
