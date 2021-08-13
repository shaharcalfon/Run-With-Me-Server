const GroupRun = require('../models/groupRunModel');
const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');

exports.createGroupRun = catchAsync(async (req, res, next) => {
  const newGroupRun = await GroupRun.create({
    runners: req.body.runners,
    date: new Date(req.body.groupRunDate),
    location: req.body.location,
  });

  const group = await Group.findById(req.body.groupId);
  const newGroupRunList = group.groupRuns;
  newGroupRunList.push(newGroupRun);
  await Group.findByIdAndUpdate(
    req.body.groupId,
    { groupRuns: newGroupRunList },
    {
      new: true,
    }
  );
  res.status(200).json({
    newGroupRun,
  });
});

exports.getGroupRunsStat = catchAsync(async (req, res, next) => {
  const groupRuns = await GroupRun.aggregate([]);

  res.status(200).json({
    groupRuns: groupRuns,
  });
});

exports.getFutureGroupRuns = catchAsync(async (req, res, next) => {
  const groupRuns = await GroupRun.aggregate([]);

  res.status(200).json({
    groupRuns: groupRuns,
  });
});
