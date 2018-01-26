var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var User = require('../models/user');

var User = mongoose.User;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


 router.get('/index', function(req, res, next) {
 	res.render('users/index', { title: 'Home page' });
 });

 router.get('/nationalLevel', function(req, res, next) {
 	res.render('users/nationalLevel', { title: 'National Level' });
 });

 router.get('/about', function(req, res, next) {
 	res.render('users/about', { title: 'About' });
 });

 router.get('/contactus', function(req, res, next) {
 	res.render('users/contactus', { title: 'Contact us' });
 });

router.get('/memberRegisteration', function(req, res, next) {
 	res.render('users/memberRegister', { title: 'Contact us' });
 });


module.exports = router;
