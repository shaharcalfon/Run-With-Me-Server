const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/check-token', authController.verifyToken);

// Protect all routes after this middleware
userRouter.use(authController.protect);

userRouter.patch('/add-friend', userController.addFriend);

userRouter.patch('/delete-friend', userController.deleteFriend);

userRouter.get('/my-friends', userController.getMyFriends);

userRouter.patch('/update-me', userController.updateMe);

userRouter.get('/me', userController.getMe, userController.getUser);

userRouter.route('/:id').get(userController.getUser);

userRouter.route('/').get(userController.getAllUsers);

module.exports = userRouter;
