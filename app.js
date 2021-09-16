const express = require('express');
const cookieParser = require('cookie-parser');

require('./models/routeModel');
require('./models/groupRunDataModel');
require('./models/groupRunModel');
require('./models/runDataModel');
require('./models/runModel');
require('./models/groupModel');
require('./models/userModel');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const groupRouter = require('./routes/groupRoutes');
const groupRunRouter = require('./routes/groupRunRoutes');
const runRouter = require('./routes/runRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

app.use('/run-with-me/groups', groupRouter);
app.use('/run-with-me/group-runs', groupRunRouter);
app.use('/run-with-me/runs', runRouter);
app.use('/run-with-me/users', userRouter);

//Handle for unknown URL.
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
