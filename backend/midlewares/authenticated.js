'use strict'

//with this middleware method, it runs first and checks if in the headers
//is the authorization variable and the token value, -> authorization: token value
//if it is, the method of the route where we put the middleware is exited and executed

var jwt = require('jwt-simple');
var moment = moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

//when you run next, we exit the middleware
exports.ensureAuth = function(req, res, next){
	//the token will come through the header
	if(!req.headers.authorization){
		return res.status(403).send({ message: 'The request does not have the authentication header'});
	}
	// to remove double or single quotes from the token:
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
			var payload = jwt.decode(token, secret);
			if(payload.exp <= moment().unix()){
				return res.status(401).send({ message: 'The token has expired'});
			}
	}catch(ex){
			return res.status(404).send({ message: 'The token is not valid'});
	}
	
	// ** object of the registered user: //is the decoded and understandable token
	//when using this middleware it will return us in the request: req.user and we can obtain it directly in the controllers
	req.user = payload;
	
	//we go out and execute the respective controller
	next();

}