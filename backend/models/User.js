const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A firstName must be provided'],
  },
  lastName: {
    type: String,
    required: [true, 'A lastName must be provided'],
  },
  middleName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is needed for authentication'],
    minlength: [8, 'The minimum length for password is 8'],
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password does not match',
    },
  },
  photo: {
    type: String,
    default: '/img/users/default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  level: {
    type: String,
    enum: ['secondary', 'siwes', 'saed'],
    required: [true, 'A level is needed to be registered!'],
  },
  dob: {
    String,
  },
  courseOfStudy: {
    type: String,
  },
});
