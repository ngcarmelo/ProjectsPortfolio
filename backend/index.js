'use strict'

//en la consola: "npm start" para establecer conexion
//así ejecutamos el script que tenemos en el package.json

var mongoose = require('mongoose');  //importamos el modulo de moongose
var app = require('./app'); //ruta del app.js , no hace falta la extension y así lo cargamos aqui
var port = 3700;  // puerto de mi servidor

mongoose.Promise = global.Promise;   //conexion a bd, nuestra bd se llama portafolio
mongoose.connect('mongodb://localhost:27017/portafolio')
	.then(()=> {
		console.log('Conexion a bd establecida con exito');

		//Creacion del servidor
		app.listen(port,() =>{
			console.log('Servidor corriendo correctamente en la url: localhost: 3700');
			//http://localhost:3700/

		});


	})

	.catch(err => console.log(err));