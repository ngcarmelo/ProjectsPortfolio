'use strict'

var express = require('express');
//En esta variable cargo el controlador:
var ProjectController = require('../controllers/project'); 
// En esta variable cargamos el router:
var router = express.Router();
//Cargamos el paquete instalado para trabajar con files, y creamos la carpeta uploads
// donde se van a subir los archivos en este caso
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Ahora nos creamos las rutas:
//controlador: ProjectController(nombre de la variable recien creada que hace 
//referencia al archivo que esta en: ../controllers/project.js') y el metodo home que tiene
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
//es put, porque es para modificar/actualizar la bd
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
//esta ruta lleva como variable un middleware que se ejecuta
// justo antes que el metodo del controlador
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

//ruta para obtener url de imagenes
router.get('/get-image/:image', ProjectController.getImageFile);






module.exports = router;
