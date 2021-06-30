const express = require('express');

const groupRouter = require('./routes/groupRoutes');
const groupRunRouter = require('./routes/groupRunRoutes');
const runRouter = require('./routes/runRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use('/run-with-me/groups', groupRouter);
app.use('/run-with-me/groups-run', groupRunRouter);
app.use('/run-with-me/runs', runRouter);
app.use('/run-with-me/users', userRouter);

//Handle for unknown URL.
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
