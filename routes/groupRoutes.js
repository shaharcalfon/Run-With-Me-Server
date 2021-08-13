const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const groupRouter = express.Router();

groupRouter.use(authController.protect);

groupRouter.get('/my-groups', groupController.getMyGroups);
groupRouter.post('/save-group', groupController.saveGroup);

module.exports = groupRouter;
