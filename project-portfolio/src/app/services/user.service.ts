'use strict'

import { Injectable } from '@angular/core'; //definir servicios e inyectarlos
import { HttpClient, HttpHeaders } from '@angular/common/http'; // para hacer las peticiones ajax y cabeceras
import { Observable } from 'rxjs/Observable'; // para recoger las respuestas del api **posible problema segun version
import { Global } from '../services/global';
import { User } from '../models/user';

@Injectable() //Decorador
export class UserService{
	public url:string; //url del backend
	
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url = Global.url;
		//console.log(this.url);
	}
	//Metodo de registro
	register(user: User): Observable<any>{
		let params = JSON.stringify(user); //json(objeto) convertido a string
		let headers = new HttpHeaders().set('Content-type', 'application/json'); //en php el application/json seria diferente
		
		//Peticion al API:
		//Parametros: 1º url 2º params(el objeto que enviamos) 3º headers
		return this._http.post(this.url+'/register', params, {headers: headers});
	}

	//Metodo para logearse
	signup(user: any, gettoken = null): Observable<any>{

		//tal como esta el backend, si hay gettoken nos devolverá el token
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'/login', params, {headers: headers});


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