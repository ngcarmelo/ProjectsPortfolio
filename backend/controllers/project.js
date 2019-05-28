'use strict'

//Controller

//import our model
var Project = require('../models/project');

//load library to delete images
var fs = require('fs');
//load library to load physical routes:
var path = require('path');

var controller = {
	home: function(req,res){
		return res.status(200).send({
			message: 'I am home'
		});

	},
	test: function(req, res){
		return res.status(200).send({
			message: 'I am the method or action test of the project controller'
		});

	},

	saveProject: function(req, res){
		var project = new Project();
	// it's going to be a post so the parameters go in the body
		var params = req.body;

		project.name = params.name
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		//save in db:



		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error saving'});
			if (!projectStored) return res.status(404).send({message: 'The project could not be saved.'});

			return res.status(200).send({project: projectStored});
		});



		// return res.status(200).send({
		// 	//params: params,
		// 	project: project,
		// 	message: 'Metodo saveProject'
		// });

	},

	getProject: function(req, res){
		// Catch value from url:
		var projectId = req.params.id;
		

		if(projectId == null){
			return res.status(404).send({message: 'The project does not exist'});
		}

		//We are looking from the bd by id an object that is in it. (mongoose)
		Project.findById(projectId, (err, project) =>{
			if(err) return res.status(500).send({message: 'Error returning data'});
			if(!project) return res.status(404).send({message: 'The project does not exist'});

			return res.status(200).send({
				project
			});
		});

	},

	getProjects: function(req, res){
		//optional .sort('year')
		//with 'find' we look for all the projects because we have not filtered anything
		Project.find({}).sort('year').exec((err, projects) =>{
			if(err) return res.status(500).send({message: 'Error returning data'});
			if(!projects) return res.status(404).send({message: 'There are no projects to show'});

			return res.status(200).send({projects});
		});
	},

	updateProject: function(req, res){
		//we create this variable to capture the variables in the url
		var projectId= req.params.id; //***la variable es id, porque así lo indica la ruta
		var update = req.body;  //**take the items sent the post

		//we pass the id of the object to modify, the object itself with the new properties
		//
		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
			if(err) return res.status(500).send({message: 'Error updating'});
			if(!projectUpdated) return res.status(404).send({message: 'There is no project to update'});

			return res.status(200).send({
				project: projectUpdated
			});
		});

	},

	deleteProject: function(req, res){
		var projectId = req.params.id;
	Project.findByIdAndRemove(projectId,(err, projectRemoved) => {
		if(err) return res.status(500).send({message: 'The project could not be deleted'});
		if(!projectRemoved) return res.status(404).send({message: 'Can not delete that project'});
		return res.status(200).send({
			 project: projectRemoved
		});
	});

	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		//req.files does not come by default in node.js, we need a module or plugin
		if(req.files){
			var filePath = req.files.image.path;
			
			//We get the name of the image (file), in filename:
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			
			//to get the extension:
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' | fileExt == 'jpeg' | fileExt == 'gif'){

			Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) =>{
					
					if(err) return res.status(500).send({message: 'The image has not been uploaded'});

					if(!projectUpdated) return res.status(404).send({ message: 'The project does not exist and the image has not been assigned'}); 

					return res.status(200).send({
									//files: req.files
									project: projectUpdated
								});
					});


			// if it does not have the required extension ... we delete
			}else {
				//thanks to the extension fs we can delete files
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
					messsage: "There is no image..."
				});
			}
		});
	}


};

module.exports = controller;