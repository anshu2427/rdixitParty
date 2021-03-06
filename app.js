var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var usersRoutes = require('./routes/users');
var config = require('./config/database');

var app = express();


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// db connection
mongoose.connect(config.database);
let db = mongoose.connection;
//mongoose.connect('localhost:27017/rdixit');

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

require('./config/passport');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret:'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore ({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 1000 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
app.use('/users', usersRoutes);
app.use('/', routes);

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


// Start Server
app.listen(80, function(){
  console.log('Server started on port 3022...');
});

module.exports = app;
