import { Component, OnInit, DoCheck } from '@angular/core';

import { User } from './models/user';

//We import the service, where are the methods
import { UserService } from './services/user.service';

// Declare the variables for jQuery
declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'project-portfolio';
  public identity:string;


constructor(
  
    private _userService: UserService //Variable of the UserService service
    ) {

 	   
   }

   ngOnInit(){

  	this.identity = this._userService.getIdentity();
  	console.log(this.identity);

  }

 ngDoCheck(){
    
        this.identity = this._userService.getIdentity();
      
  }




}
