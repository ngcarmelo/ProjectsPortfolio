'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//el modelo, el mismo que tenemos en bd, coleccion project
var ProjectSchema = Schema ({
	name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String
});

//ahora lo exportamos

//Primer parametro: nombre de la entidad que se guardará en la bd: Proyect
//mongoose lo comvierte a minusculas y lo pluraliza --> "projects"
// Asi coincidime con la coleccin que tenemos en la bd
module.exports = mongoose.model('Project', ProjectSchema);