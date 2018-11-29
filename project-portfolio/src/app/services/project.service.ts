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
	//Importante, indicar que el metodo va a devolver un observable de cualquier tipo
	saveProject(project: Project):Observable <any>{
		// parametros que vamos a enviar: params
		// pero necesitamos que sea un JSON string
		let params = JSON.stringify(project);
		//cabeceras
		let headers = new HttpHeaders().set('Content-Type','application/json');

		//Peticion por post al backend: esta ruta esta en nuestro backend, donde realizamos la peticion:
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
