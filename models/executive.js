var mongoose = require('mongoose');


var Schema = mongoose.Schema;



var executiveSchema = new Schema ({

_id: mongoose.Schema.Types.ObjectId,
execPhoto: {type: String},
execDescription: {type: String, required: false},
execName: {type: String, required: false},
execPost: {type: String, required: false}


}, {collection:'executiveModel'});



module.exports = mongoose.model('Executive', executiveSchema);
