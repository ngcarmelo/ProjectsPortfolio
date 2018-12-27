//Configuracion de express
'use strict'

var express = require('express');   //cargo el modulo (carga el objeto correspondiente)
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas, que esta en la carpeta routes
var project_routes = require('./routes/project');
//var contact_routes = require('./routes/contact');



//middlewares  (se ejecuta antes de realizar la peticion)

//convertimos lo que nos llegue por POST en json
app.use(bodyParser.urlencoded({extended:false}));  
app.use(bodyParser.json());


// CORPS
//donde aparece el asterisco deberemos poner nuestra url cuando tengamos subida nuestra web
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas 
app.use('/api', project_routes);
//app.use('/api', contact_routes);


//rutas de prueba

//Instalar postman

// app.get('/', (req, res) => {
// 	res.status(200).send(
// 		"<h1> Pagina de inicio </h1>"
// 	);
// });

// app.post('/test/:id', (req, res) => {
// 	console.log(req.body.nombre);
// 	console.log(req.query.web);
// 	console.log(req.params.id);

// 	res.status(200).send(
// 		"<h1> Hola mndo desde mi API de NodeJS </h1>"
// 	);
// });


// http://localhost:3700/test
// app.get('/test', (req, res) => {
// 	res.status(200).send({
// 		message: "Hola mundo desde mi API de nodeJS"
// 	});
// });




// exportar
module.exports = app;
