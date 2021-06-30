const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please insert your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please insert your last npname!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  runs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Run',
    },
  ],
  groups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
