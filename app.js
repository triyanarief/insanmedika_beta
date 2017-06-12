var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose      = require('mongoose');
var flash         = require('connect-flash');
var passport      = require('passport');
var localStrategy = require('passport-local');
var methodOverride = require('method-override')
require('dotenv').config()

var index = require('./routes/index');
var users = require('./routes/users');

var dbURI = `mongodb://${process.env.USER_NAME}:${process.env.DB_PASS}@ds031972.mlab.com:31972/${process.env.DB_NAME}`;

var app = express();

// mongodb connect
mongoose.connect('mongodb://insanmedika:INMED2017@ds031972.mlab.com:31972/insanmedika_beta');
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error ' + dbURI);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
