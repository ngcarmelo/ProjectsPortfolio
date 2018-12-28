'use strict'

var express = require ('express');
var UserController = require('../controllers/user');

//para tener acceso a los metodos: get,put....
var api = express.Router();
//cargamos el midleware de autentificacion
var md_auth = require('../midlewares/authenticated');


api.get('/home-user', UserController.home);

//Ruta con middleware de autentificacion: el ensureAuth es el metodo de la libreria de Auth
//al hacer la peticion en postman hay que incluir en el headers: authorization --> valor del token

api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);








module.exports = api;