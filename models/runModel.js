const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  date: Date,
  startTime: Date,
  endTime: Date,
  runType: {
    type: String,
    enum: ['personal', 'group'],
    default: 'personal',
  },
  runData: {
    type: mongoose.Schema.ObjectId,
    ref: 'RunData',
  },
});

const Run = mongoose.model('Run', runSchema);

module.exports = Run;
