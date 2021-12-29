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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;

  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTime;
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
