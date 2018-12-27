import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';


 //declare var jQuery:any;
 declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]

})
export class ContactComponent implements OnInit {
  public contact: Contact; //del modelo
  public save_contact;
  public status: string;
	
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService
    )

     {

  	
   }

  ngOnInit() {
  	
    }


 onSubmit(form){
    //Metodo del Sercivio userService:
    //Como nos devuelve un observable utilizamos subscribe
    this._contactService.saveContact(this.contact).subscribe(
      response => {
        if(response.user && response.user._id){
          //console.log(response.user);

          this.status = 'success';
          form.reset(); //reseteamos el formulario

        }else {
        this.status ='error';          
        }
      },
      error => {
        console.log(<any>error);

      }

      );

  }
 

  
}
