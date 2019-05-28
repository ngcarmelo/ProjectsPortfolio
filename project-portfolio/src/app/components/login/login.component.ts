import { Component, OnInit } from '@angular/core';

//to be able to access the parameters that we receive from this url and redirects:
import { Router, ActivatedRoute, Params } from '@angular/router';
//Import of the user model: (Import of the user class)
import { User } from '../../models/user';

//import the service, where are the methods
import { UserService } from '../../services/user.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]  //We declare the service
})
export class LoginComponent implements OnInit {
	public title:string;
  public user:User;  //we have changed to 'any' to avoid user error
  public status: string;

  public identity; // will have the user's object identified
  public token;  // will have the identification token

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService //Variable of the UserService service
    ) {
  this.title ='Sign in';
  this.user = new User("", "","","","","","ROLE_USER",""); // it is not necessary to indicate the role, the backend will be in charge
   }


  ngOnInit() {
  	console.log('Componente de login cargado');
  }

  onSubmit(){

    //****We make 2 requests http, one to obtain the user and another to obtain the token

    // console.log(this.user);
    // alert(this.user.password);
    //  alert(this.user.email);


//Login the user and get their data
    this._userService.signup(this.user).subscribe(
      response =>{
        this.identity = response.user; //will contain the logged-in user
          // console.log(this.identity); //user in the consola
      
           
      if(!this.identity  || !this.identity._id){
        this.status = 'error';
      }else {
           //this.status ='success';
           //Persist user data, localstorage
           //it is necessary to save it in the form of a string:
           localStorage.setItem('identity', JSON.stringify(this.identity));

           //get token
           this.getToken();

      }          


      },
      error =>{
          var errorMessage = <any> error;
          console.log(errorMessage);
         
          if(errorMessage != null){
            this.status = 'error';
          }


      });
   


  }



getToken(){


 //Login the user and get their data
    this._userService.signup(this.user, 'true').subscribe(
      response =>{
        this.token = response.token; //will contain the logged-in user
        
        console.log(this.token); //token
           
      if(this.token.length <= 0){
        this.status = 'error';

      }else {
          
           //Persist Token, localstorage
           localStorage.setItem('token', this.token);

            this.status = 'success';
            this._router.navigate(['/']);
          
      }          

      },
      error =>{
          var errorMessage = <any> error;
          console.log(errorMessage);
          if(errorMessage != null){
            this.status = 'error';
          }

      });

}

}

