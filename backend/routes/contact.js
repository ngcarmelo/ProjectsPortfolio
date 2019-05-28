'use strict'

var express = require('express');
//In this variable we load the controller:
var ContactController = require('../controllers/contact'); 
// In this variable we load the router:
var router = express.Router();
//We load the installed package to work with files, and create the uploads folder
// where the files will be uploaded in this case
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Now we create the routes:
//controller: ProjectController (name of the newly created variable that makes
//reference to the file that is in: ../controllers/project.js') and the home method that has
router.get('/home-contact', ContactController.home);
router.post('/test-contact', ContactController.test);

router.post('/save-contact', ContactController.saveContact);
router.get('/contact/:id?', ContactController.getContact);
//router.get('/contacts', ContactController.getContacts);
router.get('/contacts/:page?', ContactController.getContacts);

//it's put, because it is to modify / update the bd
//router.put('/contact/:id', ContactController.updateContact);
router.delete('/contact/:id', ContactController.deleteContact);
//this route has as a variable a middleware that runs
// just before the controller method
//router.post('/upload-image/:id', multipartMiddleware, ContactController.uploadImage);

//route to get url of images
//router.get('/get-image/:image', ContactController.getImageFile);






module.exports = router;
