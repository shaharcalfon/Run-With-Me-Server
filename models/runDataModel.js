const mongoose = require('mongoose');

const runDataSchema = new mongoose.Schema({
  distance: Number,
  steps: Number,
  averageSpeed: Number,
  route: {
    type: mongoose.Schema.ObjectId,
    ref: 'RunRoute',
  },
});

const RunData = mongoose.model('RunData', runDataSchema);

module.exports = RunData;
