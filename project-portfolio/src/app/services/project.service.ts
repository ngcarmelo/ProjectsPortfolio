import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
	public url: string;

	constructor(
		private _http: HttpClient
		){
		this.url = Global.url;
	}

	testService (){
		return 'Probando el servicio de Angular';

	}
	//Important, indicate that the method will return an observable of any type
	saveProject(project: Project):Observable <any>{
		// Parameters that we are going to send: params
		// but we need it to be a JSON string
		let params = JSON.stringify(project);
		//headers
		let headers = new HttpHeaders().set('Content-Type','application/json');

		//Request for post to the backend: this route is in our backend, where we make the request:
		return this._http.post(this.url+'save-project', params, {headers: headers});


	}

	//para obtener los proyectos
	getProjects():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		//Peticion ajax:
		return this._http.get(this.url+'projects', {headers:headers});


	}

	getProject(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'project/'+id, {headers:headers});
	}

	deleteProject (id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.delete(this.url+'project/'+id, {headers:headers})

	}

	updateProject(project):Observable<any>{
		let params =JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'project/'+project._id, params, {headers:headers})
	}

}
