import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//We import routes files:
import { routing, appRoutingProviders } from './app.routing';

//We import so that the requests and the databinding, forms could work.
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { SliderComponent } from './components/slider/slider.component';
import { ResaltadoDirective } from './resaltado.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DetailMessageComponent } from './components/detail-message/detail-message.component';

import {  TruncatePipe }   from './pipes/limitTo.pipe';
import { MomentModule} from 'angular2-moment';   

//Services ** necessary to use guards
import { UserService } from './services/user.service';
import { UserGuard } from  './services/user.guard';




//import * as $ from 'jquery';

 declare var jQuery:any;
 declare var $:any;

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    SliderComponent,
    ResaltadoDirective,
    LoginComponent,
    RegisterComponent,
    MessagesComponent,
    DetailMessageComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    routing,  //we import here because it is a module
    HttpClientModule,
    FormsModule,
    MomentModule
  ],
  providers: [
  appRoutingProviders,  //we import here because it's a service
  UserService,
  UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
