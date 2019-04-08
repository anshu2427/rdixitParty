var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/users/signin');
});

// change here
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('users/signup', {title: 'PSP Sign Up', messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/adminsettings',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('users/signin', { title: 'PSP Sign In' , messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/adminhome',
    failureRedirect: '/users/signin',
    failureFlash: true
}));





module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/signin');
}


function notLoggedIn (req, res, next) {
     if(!req.isAuthenticated()){
       return next();
     }
 res.redirect('/');
  }