const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

//Handle for unknown URL.
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
