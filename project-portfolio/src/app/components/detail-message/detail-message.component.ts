import { Component, OnInit } from '@angular/core';

import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Global } from '../../services/global';

//para poder acceder a los parametros que recibamos de esta url:
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.css'],
  providers: [ContactService]

})
export class DetailMessageComponent implements OnInit {

	public url: string;
	public contact: Contact;
	public confirm: boolean;

  constructor(
  	private _contactService: ContactService,
  	private _router: Router, // para las rutas
  	private _route: ActivatedRoute //para las rutas
  		) {
  		
  		this.url = Global.url;
  		this.confirm = false;

  		 }

  ngOnInit() {

  	this._route.params.subscribe(params =>{
  		let id = params.id;
  		this.getContact(id);

  	});
  }

  getContact(id){
    // con el subscribe podemos recoger la respuesta del metodo
  	this._contactService.getContact(id).subscribe(
  		response => {
  			this.contact = response.contact;
  		}, 
  		error =>{
  			console.log(<any>error);
  		}
  		)
  }

  setConfirm(confirm){
  	this.confirm = confirm;
  }

  deleteContact(id){
  	this._contactService.deleteContact(id).subscribe(

  		response => {
  			if(response.contact){
  				//redirección
  					this._router.navigate(['/messages']);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});

  }











}
