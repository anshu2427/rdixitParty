var mongoose = require('mongoose');


var Schema = mongoose.Schema;



var eventSchema = new Schema ({

_id: mongoose.Schema.Types.ObjectId,
coverphoto: {type: String},
covertext: {type: String, required: false},
activeOrNot: {type: String, required: false}

}, {collection:'coverEvent'});



module.exports = mongoose.model('Event', eventSchema);
