const express = require('express');
const runController = require('../controllers/runController');
const authController = require('../controllers/authController');

const runRouter = express.Router();

runRouter.use(authController.protect);

runRouter.get('/my-runs', runController.getMyRuns);
runRouter.post('/save-run', runController.saveRun);

module.exports = runRouter;
