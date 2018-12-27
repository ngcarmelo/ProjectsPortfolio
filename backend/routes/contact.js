'use strict'

var express = require('express');
//En esta variable cargo el controlador:
var ContactController = require('../controllers/contact'); 
// En esta variable cargamos el router:
var router = express.Router();
//Cargamos el paquete instalado para trabajar con files, y creamos la carpeta uploads
// donde se van a subir los archivos en este caso
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Ahora nos creamos las rutas:
//controlador: ProjectController(nombre de la variable recien creada que hace 
//referencia al archivo que esta en: ../controllers/project.js') y el metodo home que tiene
router.get('/home-contact', ContactController.home);
router.post('/test-contact', ContactController.test);

router.post('/save-contact', ContactController.saveContact);
router.get('/contact/:id?', ContactController.getContact);
router.get('/contacts', ContactController.getContacts);
//es put, porque es para modificar/actualizar la bd
//router.put('/contact/:id', ContactController.updateContact);
router.delete('/contact/:id', ContactController.deleteContact);
//esta ruta lleva como variable un middleware que se ejecuta
// justo antes que el metodo del controlador
//router.post('/upload-image/:id', multipartMiddleware, ContactController.uploadImage);

//ruta para obtener url de imagenes
//router.get('/get-image/:image', ContactController.getImageFile);






module.exports = router;
