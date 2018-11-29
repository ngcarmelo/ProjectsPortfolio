'use strict'

//Controlador

//importamos nuestro modelo 
var Project = require('../models/project');

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

	saveProject: function(req, res){
		var project = new Project();
	// Como va a ser un post los parametros van en el cuerpo
		var params = req.body;

		project.name = params.name
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		//para guardarlo en la bd:



		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar'});
			if (!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});



		// return res.status(200).send({
		// 	//params: params,
		// 	project: project,
		// 	message: 'Metodo saveProject'
		// });

	},

	getProject: function(req, res){
		// Recoger valor que nos viene por la url:
		var projectId = req.params.id;
		

		if(projectId == null){
			return res.status(404).send({message: 'El projecto no existe.'});
		}

		//Nos busca de la bd por id un objeto que este en ella. (mongoose)
		Project.findById(projectId, (err, project) =>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
			if(!project) return res.status(404).send({message: 'El projecto no existe'});

			return res.status(200).send({
				project
			});
		});

	},

	getProjects: function(req, res){
		//opcional .sort('year')
		//con find buscamos todos los projectos porque no hemos filtrado nada
		Project.find({}).sort('year').exec((err, projects) =>{
			if(err) return res.status(500).send({message: 'Error al devolver'});
			if(!projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});

			return res.status(200).send({projects});
		});
	},

	updateProject: function(req, res){
		//esta variable la creamos para capturar lo que nos pasa la url
		var projectId= req.params.id; //***la variable es id, porque así lo indica la ruta
		var update = req.body;  //**coge los elementos enviados el post

		//le pasamos el id del objeto a modificar, el propio objeto con las nuevas propiedades
		//
		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
			if(err) return res.status(500).send({message: 'Error al actualizar'});
			if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto a actualizar'});

			return res.status(200).send({
				project: projectUpdated
			});
		});

	},

	deleteProject: function(req, res){
		var projectId = req.params.id;
	Project.findByIdAndRemove(projectId,(err, projectRemoved) => {
		if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
		if(!projectRemoved) return res.status(404).send({message: 'No se puede eliminar ese proyecto'});
		return res.status(200).send({
			 project: projectRemoved
		});
	});

	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		// req.files no viene por defecto en node.js, necesitamos un modulo o plugin
		if(req.files){
			var filePath = req.files.image.path;
			
			//Obtenemos el nombre de la imagen(archivo), en filename:
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			
			//para obtener la extension:
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' | fileExt == 'jpeg' | fileExt == 'gif'){

			Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) =>{
					
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({ message: 'El proyecto no exiate y no se ha asignado la imagen'}); 

					return res.status(200).send({
									//files: req.files
									project: projectUpdated
								});
					});


			// sino tiene la extension requerida...borramos
			}else {
				//gracias a la extension fs poddemos borrar archivos
					fs.unlink(filePath, (err)=>{
						return res.status(200).send({ message: 'La extension no es valida'});

					});
			}

		
			
		}else {
			return res.status(200).send({
				message: fileName

			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) =>{

			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					messsage: "No existe la imagen..."
				});
			}
		});
	}


};

module.exports = controller;