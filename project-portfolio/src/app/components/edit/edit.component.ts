import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
// we import the other service, to upload files
import { UploadService } from '../../services/upload.service';
// we import the variable with url from my api (backend)
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

//in this component we are going to take advantage of the view of the create component
@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project; //from model
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;


  constructor(
  	private _projectService: ProjectService,  //from Service
  	private _uploadService: UploadService,   //from file upload Service
  	private _route: ActivatedRoute,
  	private _router: Router
  	) {
    this.title = "Editar proyecto";
    this.url = Global.url;


  }

  ngOnInit() {
  	//to pick up the parameter that comes to us through the url
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

          //Method of the created service (promise)
          //* parameter 1: url + route of the backend method (our api), followed by the id
          //** Parameter 2 : look backs / projects from the backend...
          //** Parameter 3: we obtain the id of the response to have gone up before the basic data
          //** parameter 4, it is 'image' because it is like this in the backend, the name of the field
          
          if(this.filesToUpload){

            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {

              this.save_project = result.project; //save the result in this variable
              this.status = 'success'; 
              console.log(result);
              
            });
          }else {
            this.save_project = response.project; //save the result in this variable
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
  	//in this route are the properties of the image: target.files
  	this.filesToUpload = <Array<File>>fileInput.target.files; //cast
  	//console.log(this.filesToUpload);
  }

}
