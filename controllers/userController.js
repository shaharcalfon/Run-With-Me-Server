const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    user,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    user: updatedUser,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    users: users,
  });
});

exports.addFriend = catchAsync(async (req, res, next) => {
  const newFriendList = req.user.friends;
  newFriendList.push(req.query.friendId);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { friends: newFriendList },
    {
      new: true,
    }
  );
  const newFriend = await User.findById(req.query.friendId);
  const newFriendNewFriendlist = newFriend.friends;
  newFriendNewFriendlist.push(req.user.id);
  await User.findByIdAndUpdate(req.query.friendId, {
    friends: newFriendNewFriendlist,
  });

  res.status(200).json({
    user: updatedUser,
  });
});

exports.getMyFriends = catchAsync(async (req, res, next) => {
  const friends = await User.findById(req.user.id)
    .select('friends')
    .populate('friends', '-password');

  res.status(200).json({
    myFriends: friends.friends,
  });
});

exports.deleteFriend = catchAsync(async (req, res, next) => {
  const newFriendList = req.user.friends;
  const friendIndex = newFriendList.indexOf(req.query.friendId);
  if (friendIndex > -1) {
    newFriendList.splice(friendIndex, 1);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { friends: newFriendList },
    {
      new: true,
    }
  );
  const friendToDelete = await User.findById(req.query.friendId);
  const friendToDeleteNewFriendlist = friendToDelete.friends;
  const myIndex = friendToDeleteNewFriendlist.indexOf(req.user.id);
  if (myIndex > -1) {
    friendToDeleteNewFriendlist.splice(myIndex, 1);
  }
  await User.findByIdAndUpdate(req.query.friendId, {
    friends: friendToDeleteNewFriendlist,
  });

  res.status(200).json({
    user: updatedUser,
  });
});
