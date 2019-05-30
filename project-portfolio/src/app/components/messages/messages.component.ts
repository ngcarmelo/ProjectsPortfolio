import { Component, OnInit } from '@angular/core';

import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Global } from '../../services/global';

//to be able to access the parameters that we receive from this url and redirects:
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [ContactService]

})
export class MessagesComponent implements OnInit {

	public contacts: Contact[];
	public url: string;
  public status: string;

  //pagination variables
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;

  constructor(
    private _contactService: ContactService,
    private _route: ActivatedRoute,
    private _router: Router,
    ) {

  	this.url = Global.url;
    
  }

  ngOnInit() {

  	//this.getContacts();


    this.actualPage();
  }


  actualPage(){
    
    this._route.params.subscribe(params =>{
      let page = +params['page']; 
      this.page = page;

      if(!params['page']){
        page =1;
      }

      if(!page) {
        page =1
      }else{
        this.next_page = page+1;
        this.prev_page = page+1;

        if(this.prev_page <=0){
          this.prev_page =1;
        }
      }
      
      this.getContacts(page);

    });

  }




  getContacts(page){
    this._contactService.getContacts(page).subscribe(
      response =>{
        if(!response.contacts){
          this.status='status';
        }else {
          console.log(response);
          this.total = response.total;
          this.contacts = response.contacts;
          this.pages = response.pages;
          
          if(page > this.pages){
            this._router.navigate(['/messages',1]); 
          }

        }

      },error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status ='error';
        }
      });

  }





  // getContacts(){
    // 	this._contactService.getContacts().subscribe(
    // 		response => {
      // 			//console.log(response);
      // 			if(response.contacts){
        // 				//we save the response in the created variable
        // 				this.contacts = response.contacts
        
        // 			}
        // 		},
        // 		error => {
          // 			console.log(<any>error);
          // 		});

          // }


        }
