const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

// Protect all routes after this middleware
userRouter.use(authController.protect);

userRouter.get('/me', userController.getMe, userController.getUser);

userRouter.route('/:id').get(userController.getUser);

module.exports = userRouter;
