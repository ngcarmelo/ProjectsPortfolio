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
		return 'Testing Angular Service';

	}
	//Important, indicate that the method will return an observable of any type
	saveContact(contact: Contact):Observable <any>{
		//Parameters that we are going to send: params
		// but we need it to be a JSON string
		let params = JSON.stringify(contact);
		//headers
		let headers = new HttpHeaders().set('Content-Type','application/json');

		//Request for post to the backend: this route is in our backend, where we make the request:
		return this._http.post(this.url+'save-contact', params, {headers: headers});


	}

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



	//Methods to obtain localStorage data, user values and lozenged token
	getIdentity(){

		//The string of the localstorage is converted to a JSON object
		let identity = JSON.parse(localStorage.getItem('identity'));



		if(identity != "undefined"){
			
			//console.log('exist identity');
			this.identity = identity;
			//	console.log(this.identity);
		}else {
			//	console.log('identity is null');
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
