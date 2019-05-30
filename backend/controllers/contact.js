'use strict'

//Controller

//import of the model
var Contact = require('../models/contact');

//load library to delete images
var fs = require('fs');
//it allows us to load physical routes:
var path = require('path');

var moment = require('moment');

const nodemailer = require('nodemailer');


var controller = {
	home: function(req,res){
		return res.status(200).send({
			message: 'It is homepage'
		});

	},
	test: function(req, res){
		return res.status(200).send({
			message: 'I am the method or action test of the project controller'
		});

	},

	saveContact: function(req, res){
		var contact = new Contact();
	// As it is going to be a post the parameters go in the body
	var params = req.body;

	contact.name = params.name
	contact.surname = params.surname;
	contact.email = params.email;
	contact.text = params.text;
	contact.created_at = moment().unix();
		//contact.created_at = params.created_at;

		//save in the database


//Send Email *next feature


			//  var transporter = nodemailer.createTransport({
			//  host: 'smtp.gmail.com',
			// port: 465,
   // 			secure: true, // use SSL
			//  auth: {
			//  user: 'ng.carmelo@gmail.com', // Cambialo por tu email
			//  pass: '17452759zamra' // Cambialo por tu password
			//  }
			//  });
			
			// const mailOptions = {
			//   from: 'sender@email.com', // sender address
			//   to: 'ng.carmelo@gmail.com', // list of receivers
			//   subject: 'Subject of your email', // Subject line
			//   html: '<p>Your html here</p>'// plain text body
			// };

			// transporter.sendMail(mailOptions, function (err, info) {
			//  if (err)
			//  return console.log(err);
			
			//  else
			//  console.log('Message sent: ' + info.response);
			//  });
			
			//End Send email



			contact.save((err, contactStored) => {
				if(err) return res.status(500).send({message: 'Error al guardar'});
				if (!contactStored) return res.status(404).send({message: 'The contact could not be saved.'});

				return res.status(200).send({contact: contactStored});
			});



			





		},

		getContact: function(req, res){
		// catch  value from url:
		var contactId = req.params.id;
		

		if(contactId == null){
			return res.status(404).send({message: 'The contact does not exist'});
		}

		//It searches us from bd for id an object that is in it. (mongoose)
		Contact.findById(contactId, (err, contact) =>{
			if(err) return res.status(500).send({message: 'Error returning data.'});
			if(!contact) return res.status(404).send({message: 'The contact does not exist'});

			return res.status(200).send({
				contact
			});
		});

	},

	// getContacts: function(req, res){
	// 	//optionaln  .sort('year')
	// 	//with 'find' we look for all the projects because we have not filtered anything
	// 	Contact.find({}).sort('year').exec((err, contacts) =>{
	// 		if(err) return res.status(500).send({message: 'Error returning data'});
	// 		if(!contacts) return res.status(404).send({message: 'There is not contact to show'});

	// 		return res.status(200).send({contacts});
	// 	});
	// },


//start modidified
getContacts: function(req, res){


	var page = 1;
	if(req.params.page){
		page = req.params.page;

	}
	var itemsPerPage = 5;
	
	Contact.find({}).sort('year').paginate(page, itemsPerPage,(err, contacts, total) =>{
		if(err) return res.status(500).send({message: 'Error in the request'});
		if(!contacts) return res.status(404).send({message: 'No contacts on the platform'});
		return res.status(200).send({
			total,
			pages:  Math.ceil(total/itemsPerPage),
			contacts
		});
	});


	
},

//end modified





deleteContact: function(req, res){
	var contactId = req.params.id;
	Contact.findByIdAndRemove(contactId,(err, contactRemoved) => {
		if(err) return res.status(500).send({message: 'The contact could not be deleted'});
		if(!contactRemoved) return res.status(404).send({message: 'You can not delete that contact'});
		return res.status(200).send({
			contact: contactRemoved
		});
	});

},



};

module.exports = controller;