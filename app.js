const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// variables
if(process.env.NODE_ENV === 'production') {
  urlBase = 'http://mustardseed.capital';
  googleTagId = 'GTM-N8TFCG5';
} else {
  require('./.env');
  urlBase = 'http://localhost:3000';
  googleTagId = 'ABC-012345';
}

const mainRouter = require('./app_server/routes/main-router.js');
// const usersRouter = require('./app_server/routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
// app.use('/users', usersRouter);

// Ember app build
app.use('/dashboard', express.static(__dirname + '/ember_client/dist'));

// make NPM packages accessible to HTML
app.use('/node_modules/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
