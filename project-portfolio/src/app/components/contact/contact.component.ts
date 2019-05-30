import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
// import { UserService } from '../../services/user.service';


//declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // providers: [ContactService, UserService]
  providers: [ContactService]


})
export class ContactComponent implements OnInit {
  public contact: Contact; //del modelo
  public save_contact;
  public status: string;
  public title: string;
  
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService,
    // private _userService: UserService
    )

  {
    this.contact = new Contact('','','','','','');
    this.title = "Send Message";
  }

  ngOnInit() {
    
  	
  }


  onSubmit(form){
    //Method of the userService Service:
    //Since it returns an observable we use subscribe
    this._contactService.saveContact(this.contact).subscribe(
      response => {
        if(response.contact && response.contact._id){
          //console.log(response.user);

          this.status = 'success';
          console.log('valor status en contact');
          console.log(this.status);
          form.reset(); //reset form

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
