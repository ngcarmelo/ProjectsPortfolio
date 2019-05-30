import { Component, OnInit } from '@angular/core';
//import this to be able to access the parameters that we receive from this url and redirects:
import { Router, ActivatedRoute, Params } from '@angular/router';
//Import of the user model: (Import of the user class)
import { User } from '../../models/user';

//We import the service, where are the methods
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService] //We declare the service here also
})
export class RegisterComponent implements OnInit {
	public title:string;
	public user: User;
	public status:string;

	//Besides importing we must include in the constructor the 2 variables for the routes and parameters url
  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService //Variable of the UserService service
  	) { 
  	this.title ='Sign up';
  	this.user = new User("",
      "",
      "",
      "",
      "",
      "",
      "ROLE_USER", //but it is not necessary, the backend will be in charge
      "");
  }

  ngOnInit() {
    console.log('Registration component loaded');

  }
  //We passed this variable to leave the form blank
  //Look at html that we have passed the "registerForm" but to abbreviate now as a form
  onSubmit(form){
  	//Method of the userService service:
  	//Since it returns an observable we use subscribe
  	this._userService.register(this.user).subscribe(
  		response => {
  			if(response.user && response.user._id){
  				//console.log(response.user);

  				this.status = 'success';
  				form.reset(); //form reset

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
