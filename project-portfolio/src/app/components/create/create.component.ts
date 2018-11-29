import { Component, OnInit } from '@angular/core';
//Importamos el modelo y el servicio:
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
// importamos el otro servicio, para subir archivos
import { UploadService } from '../../services/upload.service';
// importamos la variable con url de mi api (backend)
import { Global } from '../../services/global';


//Hay que agregar el servicio con la linea:  providers: [ProjectService]
//Con el servicio para subir archivos hay que añadir en el array: UploadService
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
	public title: string;
	public project: Project; //del modelo
  public save_project;
	public status: string;
	public filesToUpload: Array<File>;

  constructor(
  	private _projectService: ProjectService,  //del servicio
  	private _uploadService: UploadService   //del servicio de subida de archivos
  	) {
  		this.title = "Crear projecto";
  		this.project = new Project('','','','',2019,'','');


  	 }

  ngOnInit() {
  }

  onSubmit(form){
  	console.log(this.project);
  	//Guardar los datos basicos
  	this._projectService.saveProject(this.project).subscribe(
  		response =>{
  			//console.log(response);
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
					form.reset(); // para limpiar el formulario
  				});
  				
          }else {
            this.save_project = response.project; //guardarmos el resultado en esta variable
            this.status = 'success'; 
          }
  			}else {
  				this.status = 'failed';
  			}
  		},
  		error => {
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
