'use strict'

//necesario para las contraseñas cifradas:
var bcrypt = require('bcrypt-nodejs');

//necesario para la paginacion:
var mongoosePaginate = require('mongoose-pagination');
//Nos permite trabajar con archivos
var fs = require('fs');
var path = require('path'); //nos permite trabajar con rutas

var User = require('../models/user');
var jwt = require('../services/jwt.js');

// app.get('/', (req, res) =>{

//  	res.status(200).send({
//  		message: 'Hola Mundo desde  en el servidor de NodeJS'

//  	});
//  });

//Metodos de prueba
function home (req, res) {

 	res.status(200).send({
 		message: 'Hola Mundo desde  en el servidor de NodeJS'

 	});
 }



function pruebas (req, res) {

 	res.status(200).send({
 		message: 'Hola mundo desde  el servidor de NodeJS'

 	});
 }

//Registro
function saveUser (req, res){
	//campos que nos lleguen por post en --> params, con req.body
	var params = req.body;
	var user = new User();

	if(params.name && params.surname && params.nick
	 && params.email && params.password){ 

		user.name = params. name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		//condicion or para buscar en la BD, si existe ese email o ese nick
		//nos encontrara todos los que se repitan
		//Controlar usuarios duplicados
		User.find({ $or: [
						{email: user.email.toLowerCase()},
						{nick: user.nick.toLowerCase()}

						]}).exec((err, users) => {

							if(err) return res.status(500).send({ message: 'Error en la peticion de usuarios'});

							if(users && users.length >= 1){
								return res.status(200).send({ message: 'El usuario que intenta registrar ya existe!!'});
							}else {

								//Cifra el password y me guarda los datos:
		bcrypt.hash(params.password, null, null, (err, hash) =>{
			user.password = hash;
			//funcion de mongoose:
			user.save((err, userStored) => {
				if(err) return res.status(500).send({ message: 'Error al guardar el usuario'});
				if(userStored){
					res.status(200).send({user: userStored});
				}else{
					res.status(404).send({message: 'No se ha registrado el usuario'})
				}
			});

		});
							}
						});
		}else{
			res.status(200).send({
				message: 'Envia todos los campos necesarios'
			});
		} 
}

//Login
function loginUser(req, res){

	//al logearnos obtenemos el token, si agregamos gettoken :true en el body (postman)
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});
		if(user)  {
			//comparacion entre password del post y el almacenado en BD
			bcrypt.compare(password, user.password, (err, check)=>{
				if(check){

					//Si en la peticion está este parametro nos devuelve el token:	
					//en postman ponemos (en el body): gettoken --> true
					if(params.gettoken){
						//devolver token y generar token
						return res.status(200).send({
							//libreria jwt y el createToken es el metodo creado en: services/jwt.js
							token: jwt.createToken(user)
						});

					}else {
					//devolver datos de usuario
					user.password = undefined; //eliminamos esta propiedad por seguridad 
												//y que no la muestre al devolver datos
					return res.status(200).send({user});
					}
					
					
				}else {
					return res.status(404).send({message:'El usuario no se ha podido identificar'});
				}

			});
		}else {
			return res.status(404).send({message:'El usuario no se ha podido identificar!!!'});
		}
	})

}





 module.exports = { 
 	home, 
 	pruebas,
 	saveUser,
 	loginUser
 	
 }