const mongoose = require('mongoose');

const runDataSchema = new mongoose.Schema(
  {
    distance: Number,
    steps: Number,
    averagePace: String,
    route: {
      type: mongoose.Schema.ObjectId,
      ref: 'RunRoute',
    },
  },
  { versionKey: false }
);

runDataSchema.pre(/^find/, function (next) {
  this.populate('route');

  next();
});

const RunData = mongoose.model('RunData', runDataSchema);

module.exports = RunData;
