'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // nos permitirá definir nuevos esquemas

var UserSchema = Schema({
		name: String,
		surname: String,
		nick: String,
		email: String,
		password: String,
		role: String,
		image: String
});

//ahora lo exportamos

//First parameter: name of the entity that will be saved in the bd: User
//mongoose converts it to lowercase and pluralizes it -> "users"
// in this way matches the collection we have in the bd
module.exports = mongoose.model('User', UserSchema); 