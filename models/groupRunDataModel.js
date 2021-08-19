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
    averageDistance: { type: Number, default: 0 },
    averageSteps: { type: Number, default: 0 },
    averageOfAveragePace: { type: String, default: '' },
  },
  { versionKey: false }
);

groupRunDataSchema.pre(/^find/, function (next) {
  this.populate('membersRuns');

  next();
});

const GroupRunData = mongoose.model('GroupRunData', groupRunDataSchema);

module.exports = GroupRunData;
