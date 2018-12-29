import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Importamos archivos rutas:
import { routing, appRoutingProviders } from './app.routing';

//Importamos para que funcionen las peticiones y  el databinding, formularios.
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
    DetailMessageComponent
  ],
  imports: [
    BrowserModule,
    routing,  //importamos aqui porque es un modulo
    HttpClientModule,
    FormsModule
  ],
  providers: [
  appRoutingProviders  //importamos aqui porque es un servicio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
