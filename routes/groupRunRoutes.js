const express = require('express');
const groupRunController = require('../controllers/groupRunController');

const groupRunRouter = express.Router();

groupRunRouter.get('/create-group-run', groupRunController.createGroupRun);
groupRunRouter.get('/group-runs-stat', groupRunController.getGroupRunsStat);
groupRunRouter.get('/future-group-runs', groupRunController.getFutureGroupRuns);

module.exports = groupRunRouter;
