const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A firstName must be provided'],
    },
    lastName: {
      type: String,
      required: [true, 'A lastName must be provided'],
    },
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: '/img/users/default.jpg',
    },
    role: {
      type: String,
      enum: ['student', 'volunteer'],
      default: 'student',
    },
    level: {
      type: String,
      enum: ['secondary', 'undergraduate', 'corp_member'],
      required: [true, 'A level is needed to be registered!'],
    },
    address: String,
    state: {
      type: String,
      required: [true, 'State of origin is needed to be registered!'],
    },
    courseOfStudy: {
      type: String,
    },
    institution: {
      type: String,
      required: [true, 'Name of institution is needed to be registered'],
    },
    areaOfSpecialization: {
      type: String,
      required: [true, 'Choose an area of specialization!'],
    },
    city: String,
    zip: String,
    classLevel: String,
    schoolAddress: String,
    language: String,
    approved: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
