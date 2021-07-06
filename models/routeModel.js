const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  coordinates: [[Number]],
});

const Route = mongoose.model('RunRoute', routeSchema);

module.exports = Route;
