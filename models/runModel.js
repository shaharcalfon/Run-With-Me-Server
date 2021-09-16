const mongoose = require('mongoose');

const runSchema = new mongoose.Schema(
  {
    userName: String,
    date: Date,
    startTime: Date,
    endTime: Date,
    runType: {
      type: String,
      enum: ['PERSONAL', 'GROUP'],
      default: 'PERSONAL',
    },
    runData: {
      type: mongoose.Schema.ObjectId,
      ref: 'RunData',
    },
  },
  { versionKey: false }
);

runSchema.pre(/^find/, function (next) {
  this.populate('runData');

  next();
});

const Run = mongoose.model('Run', runSchema);

module.exports = Run;
