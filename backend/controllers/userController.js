const Admin = require('../models/Admin');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

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

  const filterWord = req.originalUrl.split('users/')[1];

  if (filterWord === 'students') {
    filter = { role: 'student' };
  } else if (filterWord === 'volunteers') {
    filter = { role: 'volunteer' };
  }

  console.log({ filterWord });
  console.log({ filter });

  const users = await User.find(filter);

  res.status(200).json({
    status: 'success',
    length: users.length,
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

exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin)
    return next(
      new AppError('No admin with the specified id found on this server', 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      admin,
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

  console.log(req.body);

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
    address,
    city,
    zip,
    classLevel,
    language,
    schoolAddress,
  };

  console.log({ details });

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
  req.params.id = req.admin.id;
  console.log('ID:', req.params.id);
  next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  console.log({ admin });
  console.log(req.body);

  if (!admin)
    return next(
      new AppError('No user with the specified id found on this server', 404)
    );

  const updatedUser = await Admin.findByIdAndUpdate(admin._id, req.body, {
    new: true,
    runValidators: true,
  });

  console.log({ updatedUser });

  updatedUser.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      admin: updatedUser,
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

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const allowedFields = ['name', 'email', 'username'];

  const filteredFields = filterObj(req.body, ...allowedFields);

  const admin = await Admin.findByIdAndUpdate(req.admin.id, filteredFields, {
    new: true,
    runValidators: true,
  });

  // createSendToken(admin, 200, res);
  res.status(200).json({
    status: 'success',
    admin,
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
