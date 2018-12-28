import { Component } from '@angular/core';
import { User } from './models/user';

//Importamos el servicio, donde están los metodos
import { UserService } from './services/user.service';

// Declaramos las variables para jQuery
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
  
    private _userService: UserService //Variable del servicio UserService
    ) {

 	 
  
   }

   ngOnInit(){

  	this.identity = this._userService.getIdentity();
  	console.log(this.identity);

  }






}
