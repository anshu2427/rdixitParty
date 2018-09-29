var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');

var User = require('../models/user');
var Register = require('../models/register');
var Contact = require('../models/contact');
var Event = require('../models/event');
var Executive = require('../models/executive');


//var User = mongoose.User;


var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
	}
});

var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  	cb(null, true);
  } else {
  	cb(null, false);
  }
};




var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});             


/* GET home page. */
router.get('/', function(req, res, next) {
	Event.find()
	.then(function(doc){
		  res.render('users/index', {coverers: doc, title: 'Prajatantrik Samajvadi Party' });

		});
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

  router.get('/donateus', function(req, res, next) {
 	res.render('users/donateus', { title: 'Donate us' });
 });


router.get('/memberRegisteration', function(req, res, next) {
 	res.render('users/memberRegister', { title: 'Contact us' });
 });

 router.get('/executives', function(req, res, next) {
 	Executive.find()
 	.then(function(doc){
 		 	res.render('users/executives', {executiveModel: doc , title: 'See Our Executives' });

 		 });
 });

router.get('/user/showregisters', isLoggedIn, function(req, res, next){
	Register.find()
	.then(function(doc){
		res.render('users/showregister', {showregister: doc , title: 'Show Register'});
		});
});

router.get('/users/showcontact', isLoggedIn, function(req, res, next){
	Contact.find()
	.then(function(doc){
		res.render('users/showcontactusList', {contactform1: doc , title: 'Show Contact Us List'});
	});
});

router.get('/shownews', isLoggedIn, function(req, res, next){
	Event.find()
	.then(function(doc){
			res.render('users/shownews', {coverers: doc , title: 'Show News / Cover Image'});
	});
});

router.get('/showexecutives', isLoggedIn, function(req, res, next){
	Executive.find()
	.then(function(doc){
			res.render('users/showexecutives', {executiveModel: doc , title: 'Show Executives'});
	});
});

router.get('/addcover', isLoggedIn , function(req, res, next) {
 res.render('users/addcover', {title: 'Add Cover' });
});


router.get('/addexecutives', isLoggedIn , function(req, res, next) {
 res.render('users/addexecutives', {title: 'Add Executives' });
});


// POST Method for contact us form

router.post('/contactus' , function(req, res, next){

	var contactform2 = { yourName: req.body.yourName,
		yourMobile: req.body.yourMobile,
		yourEmail: req.body.yourEmail,
		yourBranch: req.body.yourBranch,
		yourAddress: req.body.yourAddress,
		yourFeedback: req.body.yourFeedback
	};

	var data12 = new Contact(contactform2);
	data12.save();
	console.log(req.body);
	console.log(req.file);

	res.redirect('/contactus');

});

// registration

router.post('/registrationForm', function(req, res, next){

	var info = {
		fullname: req.body.fullname,
		uniqueid: req.body.uniqueid,
		dob: req.body.dob,
		email: req.body.email,
		address: req.body.address,
		contact: req.body.contact
	};

	req.checkBody('fullname', 'Enter valid fullname').notEmpty().isLength({ min: 4 , max:100});
	req.checkBody('dob', 'Invalid dateofbirth').notEmpty().isBefore();
	req.checkBody('email', 'Enter a valid email address.').notEmpty().isEmail();
	req.checkBody('address', 'Enter a valid address.').notEmpty().isLength({ min: 4 , max:100});
	req.checkBody('contact', 'Invalid contact').notEmpty().isMobilePhone("en-IN").isNumeric().isLength({ min: 10 , max:10});
	

	var errors = req.validationErrors();
	var messages = req.flash('error');

	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});

		res.render('users/memberRegister', {  messages: messages , hasErrors: messages.length > 0});
		return;
	}

	var data = new Register(info);
	data.save();
	console.log(req.body);
	console.log(req.file);

	res.redirect('/');

});

/* admin post methods ADD COVER */


 router.post('/users/addcover', upload.single('coverphoto') , function(req, res, next){
 	console.log(req.body);
 	console.log(req.file);


 	const coverer = {
 		_id: new mongoose.Types.ObjectId(),
 		covertext: req.body.covertext,
 		activeOrNot: req.body.activeOrNot,
 		coverphoto: req.file.path
 	};

 	req.checkBody('covertext', 'Enter cover news or event').notEmpty();
 	req.checkBody('activeOrNot', 'Enter image is active or not').notEmpty();

 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('users/addcover', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}

 	const event1 = new Event(coverer);
 	event1.save(); 	
 	res.redirect('/addcover');  

 });

 /* admin post methods ADD Executive */


 router.post('/users/addexecutives', upload.single('exePhoto') , function(req, res, next){

 	const executiveModels = {
 		_id: new mongoose.Types.ObjectId(),
 		execDescription: req.body.exeDescription,
 		execName: req.body.exeName,
 		execPost: req.body.exePost,
 		execPhoto: req.file.path
 	};

 	req.checkBody('exeName', 'Enter executive full name').notEmpty();
 	req.checkBody('exeDescription', 'Enter executive brief information').notEmpty();
	console.log(req.body);
 	console.log(req.file);
 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('users/addexecutives', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}

 	const executiveModels1 = new Executive(executiveModels);
 	executiveModels1.save(); 	
 	res.redirect('/addexecutives');  

 });
 



 router.get('/adminsettings', function(req, res, next) {
  res.render('users/adminsettings', {title: 'Admin Settings' });
});


router.get('/adminsetting',isLoggedIn, function(req, res, next){
	User.find()
	.then(function(doc){
		res.render('users/adminsettings', {userers: doc , title: 'Show Registered Admin Users'});
	});
	});

router.get('/adminhome', isLoggedIn, function(req, res, next) {
     res.render('users/adminhome' , {title: 'Admin Panel' });
  });



router.delete('/shownews/:id',isLoggedIn, function(req, res){
var query = {_id:req.params.id}

	Event.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});

router.delete('/showexecutives/:id',isLoggedIn, function(req, res){
var query = {_id:req.params.id}

	Executive.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});

router.delete('/showcontacts/:id',isLoggedIn, function(req, res){
var query = {_id:req.params.id}

	Contact.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});

router.delete('/registers/:id',isLoggedIn, function(req, res){
var query = {_id:req.params.id}

	Register.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});

router.delete('/adminsettings/:id',isLoggedIn, function(req, res){
var query = {_id:req.params.id}

	User.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});

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