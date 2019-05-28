//Express configuration
'use strict'

var express = require('express');   //we load the module (load the corresponding object)
var bodyParser = require('body-parser');

var app = express();

//load files routes, which is in the routes folder
var project_routes = require('./routes/project');
var contact_routes = require('./routes/contact');
var user_routes = require('./routes/user');



//middlewares  (It is executed before making the request)

//we convert what comes  by POST in json
app.use(bodyParser.urlencoded({extended:false}));  
app.use(bodyParser.json());




// CORPS
//where the asterisk appears we will have to put our url when we have uploaded our web
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas 
app.use('/api', project_routes);
app.use('/api', contact_routes);
app.use('/api', user_routes);


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
