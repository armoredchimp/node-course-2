const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required'],
    maxlength: [40, 'Username must have 40 or less characters'],
    minlength: [4, 'Username must have at least 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [8, 'Password must have 8 characters or more'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm the password'],
    validate: {
      // Only works on Save / Create
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
