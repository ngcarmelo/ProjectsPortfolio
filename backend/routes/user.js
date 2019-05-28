'use strict'

var express = require ('express');
var UserController = require('../controllers/user');

// have access to the methods: get, put ....
var api = express.Router();
//we load the authentication middleware
var md_auth = require('../midlewares/authenticated');


api.get('/home-user', UserController.home);

//Path with authentication middleware: ensureAuth is the method of the Auth library
//when making the request in postman it is necessary to include in the headers: authorization -> value of the token

api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);








module.exports = api;