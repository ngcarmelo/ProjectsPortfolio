'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//el modelo, el mismo que tenemos en bd, coleccion project
var ContactSchema = Schema ({
	name: String,
	surname: String,
	email: String,
	text: String,
	created_at: String
	
});

//ahora lo exportamos

//Primer parametro: nombre de la entidad que se guardará en la bd: Proyect
//mongoose lo comvierte a minusculas y lo pluraliza --> "projects"
// Asi coincidime con la coleccin que tenemos en la bd
module.exports = mongoose.model('Contact', ContactSchema);