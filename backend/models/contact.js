'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//the model, the same as we have in bd, project collection
var ContactSchema = Schema ({
	name: String,
	surname: String,
	email: String,
	text: String,
	created_at: String
	
});

//ahora lo exportamos

//First parameter: name of the entity that will be saved in the bd: Contact
//mongoose converts it to lowercase and pluralizes it -> "contacts"
// in this way matches the collection we have in the bd
module.exports = mongoose.model('Contact', ContactSchema);