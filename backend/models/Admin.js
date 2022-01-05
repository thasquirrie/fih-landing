const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An admin must have a name.'],
    },
    username: {
      type: String,
      required: [true, 'An admin must have a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'An admin must have an email address'],
      validate: [validator.isEmail, 'Please provide a valid email address'],
      unique: true,
      lowercase: 8,
      trim: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    password: {
      type: String,
      required: [true, 'Password is needed for authentication'],
      minlength: [8, 'Password minimum length is 8 characters'],
    },
    confirmPassword: {
      type: String,
      required: [
        true,
        'You need to provide this to make sure your password is correct.',
      ],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords does not match!',
      },
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;

  next();
});

adminSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

adminSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTime;
  }

  return false;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
