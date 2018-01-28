var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var contactSchema = new Schema ({

yourName: {type: String, required: true},
yourMobile: {type: Number, required: true},
yourEmail: {type: String, required: true},
yourBranch: {type: String, required: false},
yourAddress: {type: String, required: true},
yourFeedback: {type: String, required: false}

}, {collection:'contactUsList'});



module.exports = mongoose.model('Contact', contactSchema);
