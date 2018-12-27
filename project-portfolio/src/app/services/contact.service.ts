import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()
export class ContactService {
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
	saveContact(contact: Contact):Observable <any>{
		// parametros que vamos a enviar: params
		// pero necesitamos que sea un JSON string
		let params = JSON.stringify(contact);
		//cabeceras
		let headers = new HttpHeaders().set('Content-Type','application/json');

		//Peticion por post al backend: esta ruta esta en nuestro backend, donde realizamos la peticion:
		return this._http.post(this.url+'save-contact', params, {headers: headers});


	}

	//para obtener los proyectos
	getContacts():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		//Peticion ajax:
		return this._http.get(this.url+'contacts', {headers:headers});


	}

	getContact(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'contacts/'+id, {headers:headers});
	}

	deleteContact (id):Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.delete(this.url+' contact/'+id, {headers:headers})

	}

	updateContact(contact):Observable<any>{
		let params =JSON.stringify(contact);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'contact/'+contact._id, params, {headers:headers})
	}

}
