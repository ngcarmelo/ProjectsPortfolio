import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
//import next line to be able to access the parameters that we receive from this url:
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]

})
export class DetailComponent implements OnInit {
	public url: string;
	public project: Project;
	public confirm: boolean;

  constructor(
  	private _projectService: ProjectService,
  	private _router: Router, // to be able to receive routes and parameters
  	private _route: ActivatedRoute //to be able to receive routes and parameters
  	) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit() {
  	//to collect the parameter that we get through the url
  	this._route.params.subscribe(params =>{
  		let id = params.id;
  		this.getProject(id);

  	});
  }

  getProject(id){
    //with the subscribe we can pick up the answer of the method
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      }, 
      error =>{
        console.log(<any>error);
      }
      )
  }

  setConfirm(confirm){
  	this.confirm = confirm;
  }

  deleteProject(id){
  	this._projectService.deleteProject(id).subscribe(

  		response => {
  			if(response.project){
  				//redirection
          this._router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(<any>error);
      });

  }


}
