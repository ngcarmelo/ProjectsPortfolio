import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [UserService]
})
export class AboutComponent implements OnInit {
	public title: string;
	public subtitle: string;
	public email: string;
  public identity: string;

  constructor(
     private _userService: UserService
     ) {
  	this.title ="Carmelo Navarro";
  	this.subtitle="Desarrollador Web";
  	this.email ="ng.carmelo@gmail.com";

   }

  ngOnInit() {
     
  }

}
