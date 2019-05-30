import { Component, OnInit } from '@angular/core';
//import the model and the service:
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
//import the other service, to upload files
import { UploadService } from '../../services/upload.service';
//import the variable with url from my api (backend)
import { Global } from '../../services/global';


//We have to add the service with the line: providers: [ProjectService]
//With the service to upload files you have to add in the array: UploadService
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
  	private _projectService: ProjectService,  //from service
  	private _uploadService: UploadService   //from file upload service
  	) {
    this.title = "Create project";
    this.project = new Project('','','','',2019,'','');


  }

  ngOnInit() {
  }

  onSubmit(form){
  	console.log(this.project);
  	//Save the basic data
  	this._projectService.saveProject(this.project).subscribe(
  		response =>{
  			//console.log(response);
  			if(response.project){
  				//Upload the image

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
              form.reset(); // to clean the form
            });
            
          }else {
            this.save_project = response.project; //save the result in this variable
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
  	//in this route you can find the properties of the image: target.files
  	this.filesToUpload = <Array<File>>fileInput.target.files; //cast
  	//console.log(this.filesToUpload);
  }



}
