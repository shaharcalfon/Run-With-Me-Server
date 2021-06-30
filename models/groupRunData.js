const mongoose = require('mongoose');

const groupRunDataSchema = new mongoose.Schema({
  numberOfRunners: Number,
  totalDistance: Number,
  averageSpeed: Number,
  membersRuns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Run',
    },
  ],
});

const GroupRunData = mongoose.model('GroupRunData', groupRunDataSchema);

module.exports = GroupRunData;
