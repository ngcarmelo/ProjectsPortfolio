import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
//para poder acceder a los parametros que recibamos de esta url:
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
  	private _router: Router, // para las rutas
  	private _route: ActivatedRoute //para las rutas
  	) {
  			this.url = Global.url;
  			this.confirm = false;
  	 }

  ngOnInit() {
  	//para recoger el parametro que nos llega por la url 
  	this._route.params.subscribe(params =>{
  		let id = params.id;
  		this.getProject(id);

  	});
  }

  getProject(id){
    // con el subscribe podemos recoger la respuesta del metodo
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
  				//redirección
  					this._router.navigate(['/proyectos']);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});

  }


}
