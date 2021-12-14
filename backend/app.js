const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser=');
const morgan = require('morgan');
const colors = require('colors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'developement') {
  morgan('dev');
} else if (process.env.NODE_ENV === 'production') {
  morgan('short');
}

app.use('uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res, next) => {
    res.status(200).send('API is running on port 4000');
  });
}

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The requested page: ${req.originalUrl} is not found on this server`,
      404
    )
  );
});

app.use(globalEerrorHandler);

module.exports = app;
