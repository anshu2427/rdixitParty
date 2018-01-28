var mongoose = require('mongoose');



const serverSchema = mongoose.Schema ({

fullname: {type: String, required: true},
uniqueid: {type: String, required: true},
dob: {type: String, required: true},
email: {type: String, required: true},
address: {type: String, required: true},
contact:{type: String, required: true}

}, {collection:'registration'});


module.exports = mongoose.model('Register', serverSchema);
