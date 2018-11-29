import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
// importamos el otro servicio, para subir archivos
import { UploadService } from '../../services/upload.service';
// importamos la variable con url de mi api (backend)
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

//en este componente vamos a aprovechar la vista del componente create
@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {

  	public title: string;
	public project: Project; //del modelo
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;


  constructor(
  	private _projectService: ProjectService,  //del servicio
  	private _uploadService: UploadService,   //del servicio de subida de archivos
  	private _route: ActivatedRoute,
  	private _router: Router
  	) {
  		this.title = "Editar proyecto";
  		this.url = Global.url;


  	 }

 ngOnInit() {
  	//para recoger el parametro que nos llega por la url
  	this._route.params.subscribe(params =>{
  		let id = params.id;
  		this.getProject(id);

  	});
  }

  getProject(id){
  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project;
  		}, 
  		error =>{
  			console.log(<any>error);
  		}
  		)
  }

  onSubmit(){
  	this._projectService.updateProject(this.project).subscribe(
  		response => {
  			this.project = response.project;
if(response.project){
  				//Subir la imagen...

  				//Metodo del servicio creado (promesa)
  				//*parametro 1: url +ruta del metodo del backend (nuestro api), seguido del id
  				//**parametro 1: mirar rotes/projects del backend
  				//**parametro 1: el id lo obtenemos de la response al haber subido antes los datos basicos
  				//**parametro 4, es 'image' porque así esta en el backend, el nombre del campo
  				
  				if(this.filesToUpload){

  						this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
  				.then((result:any) => {

            this.save_project = result.project; //guardarmos el resultado en esta variable
  					this.status = 'success'; 
  					console.log(result);
				
  				});
  				}else {
  					this.save_project = response.project; //guardarmos el resultado en esta variable
  					this.status = 'success';
  				}

			
  				
  			}else {
  				this.status = 'failed';
  			}


  		},
  		error =>{
  			console.log(<any>error);
  		});
  }

   fileChangeEvent(fileInput: any){
  	//console.log(fileInput);
  	//en esta ruta se encuentran las prop de la imagen: target.files
  	this.filesToUpload = <Array<File>>fileInput.target.files; //cast
  	//console.log(this.filesToUpload);
  }

}
