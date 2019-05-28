'use strict'

//in the console: "npm start" to establish connection
//so we execute the script that we have in the package.json

var mongoose = require('mongoose');  //we import the moongose module
var app = require('./app'); //app.js route, no extension is needed and so we load it here
var port = 3700;  // port  server
mongoose.Promise = global.Promise;   //conexion a bd, nuestra bd se llama portafolio
mongoose.connect('mongodb://localhost:27017/portafolio')
	.then(()=> {
		console.log('Connection to bd successfully established');

		//Server creation
		app.listen(port,() =>{
			console.log('Server running correctly in the url: localhost: 3700');
			//http://localhost:3700/

		});


	})

	.catch(err => console.log(err));