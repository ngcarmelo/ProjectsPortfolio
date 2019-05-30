'use strict'

import { Injectable } from '@angular/core'; //define services and inject them
import { HttpClient, HttpHeaders } from '@angular/common/http'; // to make ajax requests and headers
import { Observable } from 'rxjs/Observable'; // to collect the responses of the api ** possible problem according to version
import { Global } from '../services/global';
import { User } from '../models/user';

@Injectable() //Decorator
export class UserService{
	public url:string; //backend url
	
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url = Global.url;
		//console.log(this.url);
	}
	//Registration method
	register(user: User): Observable<any>{
		let params = JSON.stringify(user); //json(object) converted to string
		let headers = new HttpHeaders().set('Content-type', 'application/json'); //with  php --> application/json would be different
		
		//Request to the API:
		//Parameters: 1º url 2º params(The object we send() 3º headers
		return this._http.post(this.url+'/register', params, {headers: headers});
	}

	//Method to login
	signup(user: any, gettoken = null): Observable<any>{

		//just like the backend, if there is gettoken, it will return the token
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'/login', params, {headers: headers});


	}

	//Metodos para obtener los datos del localStorage, valores de usuario y token logeado
	//Methods to obtain localStorage data, user values and login token
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

	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));

		if(stats != "undefined"){
			this.stats = stats;
		}else {
			this.stats = null;
		}

		return this.stats;

	}


}