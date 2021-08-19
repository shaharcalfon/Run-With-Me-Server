const Run = require('../models/runModel');
const RunData = require('../models/runDataModel');
const Route = require('../models/routeModel');
const GroupRun = require('../models/groupRunModel');
const GroupRunData = require('../models/groupRunDataModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const utils = require('../utils/utils');

exports.saveRun = catchAsync(async (req, res, next) => {
  const newRoute = await Route.create({
    coordinates: utils.createRoute(req.body.locations),
  });
  const newRunData = await RunData.create({
    distance: req.body.distance,
    steps: req.body.steps,
    averagePace: req.body.averagePace,
    route: newRoute,
  });
  const newRun = await Run.create({
    user: req.body.user,
    date: new Date(req.body.runDate),
    startTime: utils.createDate(req.body.startTime),
    endTime: utils.createDate(req.body.endTime),
    runType: req.body.runType,
    runData: newRunData,
  });

  const groupRun = await GroupRun.findById(req.body.groupRunId);
  const groupRunData = await GroupRunData.findById(groupRun.groupRunData);
  const newMembersRuns = groupRunData.membersRuns;
  newMembersRuns.push(newRun);
  await GroupRunData.findByIdAndUpdate(groupRunData, {
    membersRuns: newMembersRuns,
  });

  const newRunList = req.user.runs;
  newRunList.push(newRun);
  await User.findByIdAndUpdate(
    req.user.id,
    { runs: newRunList },
    {
      new: true,
    }
  );
  res.status(200).json({
    newRun,
  });
});

exports.getMyRuns = catchAsync(async (req, res, next) => {
  const runs = await User.findById(req.user.id)
    .select('runs')
    .populate('runs', '-password');

  console.log(runs.runs);

  res.status(200).json({
    myRuns: runs.runs,
  });
});
