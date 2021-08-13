const Group = require('../models/groupModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const addGroupToMember = async function (memberId, newGroup) {
  const newMember = await User.findById(memberId);
  const newGroupList = newMember.groups;
  newGroupList.push(newGroup);
  await User.findByIdAndUpdate(
    memberId,
    { groups: newGroupList },
    { new: true }
  );
};

exports.saveGroup = catchAsync(async (req, res, next) => {
  const newGroupMembersIds = req.body.groupMembers;
  newGroupMembersIds.push(req.user.id);
  console.log(newGroupMembersIds);
  const newGroup = await Group.create({
    name: req.body.name,
    description: req.body.description,
    photoUri: req.body.photoUri,
    groupMembers: newGroupMembersIds,
  });

  newGroupMembersIds.forEach(async (memberId) => {
    await addGroupToMember(memberId, newGroup);
  });

  res.status(200).json({
    newGroup,
  });
});

exports.getMyGroups = catchAsync(async (req, res, next) => {
  const groups = await User.findById(req.user.id)
    .select('groups -_id -runs')
    .populate('groups', '-password');

  console.log(groups.groups);

  res.status(200).json({
    myGroups: groups.groups,
  });
});
