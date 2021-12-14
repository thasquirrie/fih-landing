exports.getUsers = catchAsync(async (req, res, next) => {
 const users = await User.find();
});
