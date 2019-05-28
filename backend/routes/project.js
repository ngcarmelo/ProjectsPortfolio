'use strict'

var express = require('express');
//In this variable we load the controller:
var ProjectController = require('../controllers/project'); 
// In this variable we load the router:
var router = express.Router();
//We load the installed package to work with files, and create the uploads folder
// where the files will be uploaded in this case
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Now we create the routes:
//controller: ProjectController (name of the newly created variable that makes
//reference to the file that is in: ../controllers/project.js') and the home method that has
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
//it's put, because it is to modify / update the bd
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
//this route has as a variable a middleware that runs
// just before the controller method
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

//route to get url of images
router.get('/get-image/:image', ProjectController.getImageFile);






module.exports = router;
