'use strict'

//Controlador

//importamos nuestro modelo 
var Contact = require('../models/contact');

//cargar libreria para poder eliminar imagenes
var fs = require('fs');
//para poder cargar rutas fisicas:
var path = require('path');

var controller = {
	home: function(req,res){
		return res.status(200).send({
			message: 'Soy la home'
		});

	},
	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo o accion test del controlador de proyect'
		});

	},

	saveContact: function(req, res){
		var contact = new Contact();
	// Como va a ser un post los parametros van en el cuerpo
		var params = req.body;

		contact.name = params.name
		contact.surname = params.surname;
		contact.email = params.email;
		contact.text = params.text;
		contact.created_at = params.created_at;

		//para guardarlo en la bd:



		contact.save((err, contactStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar'});
			if (!contactStored) return res.status(404).send({message: 'No se ha podido guardar el contacto.'});

			return res.status(200).send({contact: contactStored});
		});




	}

	getContact: function(req, res){
		// Recoger valor que nos viene por la url:
		var contactId = req.params.id;
		

		if(contactId == null){
			return res.status(404).send({message: 'El contacto no existe.'});
		}

		//Nos busca de la bd por id un objeto que este en ella. (mongoose)
		Contact.findById(contactId, (err, contact) =>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
			if(!contact) return res.status(404).send({message: 'El contacto no existe'});

			return res.status(200).send({
				contact
			});
		});

	},

	getContacts: function(req, res){
		//opcional .sort('year')
		//con find buscamos todos los projectos porque no hemos filtrado nada
		Contact.find({}).sort('year').exec((err, contacts) =>{
			if(err) return res.status(500).send({message: 'Error al devolver'});
			if(!contacts) return res.status(404).send({message: 'No hay contactos que mostrar'});

			return res.status(200).send({contacts});
		});
	}

	

};

module.exports = controller;