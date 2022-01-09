const { promisify } = require('util');
const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Admin = require('../models/Admin');
const { updateUser } = require('./userController');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  admin.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, username, email, password, confirmPassword } = req.body;

  const details = { name, username, email, password, confirmPassword };

  const newAdmin = await Admin.create(details);

  createSendToken(newAdmin, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const admin = await Admin.findOne({ email }).select('+password');

  console.log({ password }, admin.password);

  if (!admin || !(await admin.comparePasswords(password, admin.password)))
    return next(new AppError('Wrong email or password', 400));

  createSendToken(admin, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'You have successfully logged out',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token = '';

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in! Please login to access this route',
        401
      )
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded)
    return next(
      new AppError(
        'This token does not belong to any user in this database',
        404
      )
    );

  const admin = await Admin.findById(decoded.id);
  const checked = admin.changedPasswordAfter(decoded.iat);

  if (!checked)
    return next(
      new AppError(
        'Password has changed since this token was issued. Please log in again!',
        401
      )
    );

  req.admin = admin;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role))
      return next(
        new AppError('You are restricted from accessing this route.', 403)
      );
    next();
  };
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const allowedFields = ['name', 'email', 'username'];

  const filteredFields = filterObj(req.body, ...allowedFields);

  const updatedUser = await Admin.findByIdAndUpdate(
    req.admin.id,
    filteredFields,
    {
      new: true,
      runValidators: true,
    }
  );

  const admin = updatedUser;

  createSendToken(admin, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const admin = await Admin.findById(req.admin._id).select('+password');

  if (!currentPassword || !newPassword || !confirmNewPassword)
    return next(
      new AppError('You need to provide all required input fields', 400)
    );

  if (!(await admin.comparePassword(currentPassword, admin.password)))
    return next(new AppError('Password incorrect', 401));

  admin.password = newPasssword;
  admin.confirmPassword = confirmNewPassword;
  await admin.save();

  const token = signToken(admin._id);

  res.status(200).json({
    status: 'success',
    token,
    message: 'Password updated successfully',
  });
});
