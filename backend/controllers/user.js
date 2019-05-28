'use strict'

//necessary for encrypted passwords:
var bcrypt = require('bcrypt-nodejs');

//necessary for the pagination
var mongoosePaginate = require('mongoose-pagination');
//It allows us to work with files
var fs = require('fs');
var path = require('path'); //it allows us to work with routes

var User = require('../models/user');
var jwt = require('../services/jwt.js');

// app.get('/', (req, res) =>{

//  	res.status(200).send({
//  		message: 'Hello World from on the NodeJS server'

//  	});
//  });

//Test methods
function home (req, res) {

 	res.status(200).send({
 		message: 'Hello World from on the NodeJS server'

 	});
 }



function pruebas (req, res) {

 	res.status(200).send({
 		message: 'Hello World from on the NodeJS server'

 	});
 }

//Register
function saveUser (req, res){
	//fields that we receive by post--> params, with req.body
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

		//condition 'or' to search the BD, if there is that email or that nick
		//we find all those that are repeated
		//Control duplicate users
		User.find({ $or: [
						{email: user.email.toLowerCase()},
						{nick: user.nick.toLowerCase()}

						]}).exec((err, users) => {

							if(err) return res.status(500).send({ message: 'Error in the user request'});

							if(users && users.length >= 1){
								return res.status(200).send({ message: 'The user trying to register already exists!!'});
							}else {

								//Encrypt the password and save the data:
		bcrypt.hash(params.password, null, null, (err, hash) =>{
			user.password = hash;
			//mongoose function:
			user.save((err, userStored) => {
				if(err) return res.status(500).send({ message: 'Error when saving the user'});
				if(userStored){
					res.status(200).send({user: userStored});
				}else{
					res.status(404).send({message: 'The user has not registered'})
				}
			});

		});
							}
						});
		}else{
			res.status(200).send({
				message: 'Send all the necessary fields'
			});
		} 
}

//Login
function loginUser(req, res){

	
	//when login, we get the token, if we add gettoken: true in the body (postman)
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});
		if(user)  {
			//comparison between password of the post and the stored in BD
			bcrypt.compare(password, user.password, (err, check)=>{
				if(check){

					//If this parameter is in the request, it returns the token:
					//in postman we put (in the body): gettoken -> true
					if(params.gettoken){
						//return token and generate token
						return res.status(200).send({
							//jwt library and the createToken is the method created in: services / jwt.js
							token: jwt.createToken(user)
						});

					}else {
					//return user data
					user.password = undefined; //we eliminate this property for security
												//and it does not show it when returning data
					return res.status(200).send({user});
					}
					
					
				}else {
					return res.status(404).send({message:'The user has not been able to identify'});
				}

			});
		}else {
			return res.status(404).send({message:'The user has not been able to identify!!!'});
		}
	})

}





 module.exports = { 
 	home, 
 	pruebas,
 	saveUser,
 	loginUser
 	
 }