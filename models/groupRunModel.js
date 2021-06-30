const mongoose = require('mongoose');

const groupRunSchema = new mongoose.Schema({
  runners: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  groupRunData: {
    type: mongoose.Schema.ObjectId,
    ref: 'GroupRunData',
  },
});

const GroupRun = mongoose.model('GroupRun', groupRunSchema);

module.exports = GroupRun;
