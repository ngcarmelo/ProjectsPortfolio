import { Component, OnInit } from '@angular/core';

import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [ContactService]

})
export class MessagesComponent implements OnInit {

	public contacts: Contact[];
	public url: string;

  constructor(
  	  	private _contactService: ContactService
	) {

  	this.url = Global.url;
    
 }

   ngOnInit() {

  	this.getContacts();
  }

  getContacts(){
  	this._contactService.getContacts().subscribe(
  		response => {
  			//console.log(response);
  			if(response.contacts){
  				//guardamos la respuesta en la variable creada
  				this.contacts = response.contacts
         
  			}
  		},
  		error => {
  			console.log(<any>error);
  		});

  }


}
