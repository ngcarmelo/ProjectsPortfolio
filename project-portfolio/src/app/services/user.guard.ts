'use strict'

//we can use this guard in each of the routes (private routes)
//Note: we have to import them into the app.module
// import { UserService } from './services/user.service';
// import { UserGuard } from  './services/user.guard';
// and then in providers
 // providers: [  
 //  appRoutingProviders,
 //  UserService,
 //  UserGuard
 //    ],

 // and then in the routing to import it also:
// import { UserGuard } from  './services/user.guard';

// and adding the following property in each route that we want to use it:
 // canActivate:[UserGuard]


import { Injectable } from '@angular/core'; //define services and inject them
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(
	 private _router: Router,
     private _userService: UserService
		){}


	canActivate(){

		let identity = this._userService.getIdentity();
		if(identity && (identity.role == 'ROLE_USER'  || identity.role == 'ROLE_ADMIN')){
			return true;
		}else{
			this._router.navigate(['/login']);
			return false;
		}

	}


}