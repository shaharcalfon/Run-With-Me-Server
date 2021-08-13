const mongoose = require('mongoose');

const groupRunDataSchema = new mongoose.Schema(
  {
    membersRuns: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Run',
        default: [],
      },
    ],
  },
  { versionKey: false }
);

const GroupRunData = mongoose.model('GroupRunData', groupRunDataSchema);

module.exports = GroupRunData;
