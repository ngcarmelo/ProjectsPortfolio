import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()
export class ContactService {
	public url: string;



	public identity;
	public token;

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
	// getContacts():Observable<any>{
	// 	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	// 	//Peticion ajax:
	// 	return this._http.get(this.url+'contacts', {headers:headers});

	// }


getContacts(page = null):Observable<any>{

	let headers = new HttpHeaders().set('Content-Type','application/json') //forma en que se envian los datos
								    	.set('Authorization',this.getToken()); 	//sacamos el token del localStorage

		return this._http.get(this.url+'contacts/'+page, {headers: headers});

 }






	getContact(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'contact/'+id, {headers:headers});
	}

	deleteContact (id):Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.delete(this.url+'contact/'+id, {headers:headers})

	}

	updateContact(contact):Observable<any>{
		let params =JSON.stringify(contact);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'contact/'+contact._id, params, {headers:headers})
	}



//Metodos para obtener los datos del localStorage, valores de usuario y token logeado
	getIdentity(){

		//El string del localstorage lo convertimos a un objeto JSON
		let identity = JSON.parse(localStorage.getItem('identity'));



		 if(identity != "undefined"){
		
			//console.log('existe identity');
			this.identity = identity;
		//	console.log(this.identity);
		}else {
		//	console.log('identity es nulo');
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else {
			this.token = null;
		}
		return this.token;
	}












}
