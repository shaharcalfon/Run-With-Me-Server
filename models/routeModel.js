const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  coordinates: [[Number]],
});

const Route = mongoose.model('GroupRunData', routeSchema);

module.exports = Route;
