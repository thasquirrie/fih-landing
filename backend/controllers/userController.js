const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(filter);

  res.status(200).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});

exports.getUsersByRole = catchAsync(async (req, res) => {
  let filter = {};

  const filterWord = req.originalUrl.split('/')[1];

  if (filterWord === 'students') {
    filter = { role: 'student' };
  } else if (filterWord === 'volunteers') {
    filter = { role: 'volunteer' };
  }

  const users = await User.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new AppError('No user with the specified id found on this server', 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const {
    role,
    firstName,
    lastName,
    institution,
    level,
    state,
    courseOfStudy,
    areaOfSpecialization,
    email,
    address,
    city,
    zip,
    classLevel,
    language,
    schoolAddress,
  } = req.body;

  const details = {
    role,
    firstName,
    lastName,
    institution,
    level,
    state,
    courseOfStudy,
    areaOfSpecialization,
    email,
    passwordChangedAt,
    address,
    city,
    zip,
    classLevel,
    language,
    schoolAddress,
  };

  const newUser = await User.create(details);
  console.log({ newUser });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new AppError('No user with the specified id found on this server', 404)
    );

  const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
    runValidators: true,
  });

  updatedUser.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe -
  catchAsync(async (req, res, next) => {
    const allowedFields = [
      'firstName',
      'lastName',
      'middleName',
      'dob',
      'email',
      'username',
      'stateOfOrigin',
      'phone',
    ];

    const filteredFields = filterObj(req.body, ...allowedFields);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredFields,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  });

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return next(
      new AppError('No user with the specified id found on this server', 404)
    );

  res.status(204).json({
    status: 'success',
  });
});
