const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
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
    },
    photoUri: {
      type: String,
      default: '',
    },
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    runs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Run',
        default: [],
      },
    ],
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        default: [],
      },
    ],
  },
  { versionKey: false }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  this.populate('runs');

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
