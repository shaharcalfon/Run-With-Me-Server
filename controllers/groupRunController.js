const GroupRun = require('../models/groupRunModel');
const GroupRunData = require('../models/groupRunDataModel');
const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');
const utils = require('../utils/utils');

exports.createGroupRun = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.body.groupId);
  const newGroupRunData = await GroupRunData.create({});
  const newGroupRunDataId = newGroupRunData._id;
  let groupRun = await GroupRun.create({
    group: req.body.groupId,
    runners: group.groupMembers,
    date: utils.createDateFromTimeAndDate(req.body.date, req.body.time),
    location: req.body.location,
    groupRunData: newGroupRunDataId,
  });
  groupRun = await groupRun
    .populate('group', '-photoUri -groupRuns -groupMembers')
    .populate('groupRunData')
    .execPopulate();

  const newGroupRunList = group.groupRuns;
  newGroupRunList.push(groupRun);
  await Group.findByIdAndUpdate(
    req.body.groupId,
    { groupRuns: newGroupRunList },
    {
      new: true,
    }
  );
  res.status(200).json({
    groupRun: groupRun,
  });
});
const convertAvgPaceStringToMinutes = (averagePace) => {
  let totalMinutes = 0;
  const splitedAveragePace = averagePace.split(':');
  totalMinutes += splitedAveragePace[0] * 1;
  totalMinutes += (splitedAveragePace[1] * 1) / 60;

  return totalMinutes;
};

const covertMinutesToAvgPaceString = (totalMinutes) => {
  // Separate the int from the decimal part
  const minutes = Math.floor(totalMinutes);
  let decpart = totalMinutes - minutes;

  const min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  let seconds = `${Math.floor(decpart * 60)}`;

  // Add padding if need
  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }

  // Concate hours and minutes
  const time = `${minutes}:${seconds}`;

  return time;
};

const calculateAndUpdateAverageStatistics = async (groupRun) => {
  let sumDistance = 0;
  let sumSteps = 0;
  let sumAveragePaceInMinutes = 0;
  let averageDistance = 0;
  let averageSteps = 0;
  let averageOfAveragePace = 0;
  const runs = await groupRun.groupRunData.membersRuns;
  const numberOfRuns = runs.length;

  for (let i = 0; i < runs.length; i += 1) {
    sumDistance += runs[i].runData.distance;
    sumSteps += runs[i].runData.steps;
    sumAveragePaceInMinutes += convertAvgPaceStringToMinutes(
      runs[i].runData.averagePace
    );
  }

  if (numberOfRuns > 0) {
    averageDistance = sumDistance / numberOfRuns;
    averageSteps = sumSteps / numberOfRuns;
    averageOfAveragePace = sumAveragePaceInMinutes / numberOfRuns;
  }

  await GroupRunData.findByIdAndUpdate(groupRun.groupRunData, {
    averageDistance: averageDistance,
    averageSteps: averageSteps,
    averageOfAveragePace: covertMinutesToAvgPaceString(averageOfAveragePace),
  });
};

const filterGroupRunWithData = (pastGroupRuns) => {
  const result = [];
  pastGroupRuns.forEach((pastGroupRun) => {
    if (pastGroupRun.groupRunData.membersRuns.length > 0) {
      result.push(pastGroupRun);
    }
  });

  return result;
};

exports.getPastGroupRuns = catchAsync(async (req, res, next) => {
  const nowMinusOneHour = new Date();
  nowMinusOneHour.setHours(nowMinusOneHour.getHours() + 2);
  const pastGroupRuns = await GroupRun.find({
    date: { $lte: nowMinusOneHour.toISOString() },
    group: { $eq: req.query.groupId },
  })
    .populate('group', 'name')
    .populate('groupRunData')
    .sort({ date: 1 });

  const filterwdPastGroupRuns = filterGroupRunWithData(pastGroupRuns);
  //if the average statistics still not calculated we need to do it
  filterwdPastGroupRuns.forEach((groupRun) => {
    //check if the group run data have the defualt values
    if (
      groupRun.groupRunData.averageDistance === 0 &&
      groupRun.groupRunData.averageSteps === 0 &&
      groupRun.groupRunData.averageOfAveragePace === ''
    ) {
      calculateAndUpdateAverageStatistics(groupRun);
    }
  });

  res.status(200).json({
    groupRuns: filterwdPastGroupRuns,
  });
});

exports.getFutureGroupRuns = catchAsync(async (req, res, next) => {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  const groupRuns = await GroupRun.find({
    date: { $gte: now.toISOString() },
    group: { $eq: req.query.groupId },
  })
    .populate('group', 'name')
    .populate('groupRunData')
    .sort({ date: 1 });

  res.status(200).json({
    groupRuns: groupRuns,
  });
});

exports.getTodayGroupRuns = catchAsync(async (req, res, next) => {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  const nowPlusOneHour = new Date(now);
  nowPlusOneHour.setHours(nowPlusOneHour.getHours() + 1);

  const groupRuns = await GroupRun.find({
    date: {
      $gte: now,
      $lte: nowPlusOneHour,
    },
    runners: { $elemMatch: { $eq: req.user.id } },
  })
    .populate('group', 'photoUri name')
    .populate('groupRunData');

  res.status(200).json({
    groupRuns: groupRuns,
  });
});
