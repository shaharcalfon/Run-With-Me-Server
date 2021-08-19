const express = require('express');
const groupRunController = require('../controllers/groupRunController');
const authController = require('../controllers/authController');

const groupRunRouter = express.Router();

groupRunRouter.post('/create-group-run', groupRunController.createGroupRun);

groupRunRouter.use(authController.protect);

groupRunRouter.get('/past-group-runs', groupRunController.getPastGroupRuns);
groupRunRouter.get('/future-group-runs', groupRunController.getFutureGroupRuns);
groupRunRouter.get('/today-group-runs', groupRunController.getTodayGroupRuns);

module.exports = groupRunRouter;
