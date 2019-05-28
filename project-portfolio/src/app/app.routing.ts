//Create file 'app.routing.ts' for routes
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//The routes of my components
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DetailMessageComponent } from './components/detail-message/detail-message.component';

//Guard:
import { UserGuard } from  './services/user.guard';


//each route with its component
const appRoutes: Routes = [
{path: '', component: AboutComponent},
{path: 'sobre-mi', component: AboutComponent},
{path: 'proyectos', component: ProjectsComponent},
{path: 'crear-proyecto', component: CreateComponent,  canActivate:[UserGuard]},
{path: 'contacto', component: ContactComponent}, 
{path: 'proyecto/:id', component: DetailComponent}, 
{path: 'editar-proyecto/:id', component: EditComponent,  canActivate:[UserGuard]}, 
{path: 'register', component:RegisterComponent}, 
{path: 'login', component:LoginComponent}, 
{path: 'messages', component:MessagesComponent, canActivate:[UserGuard]}, 
{path: 'messages/:page', component: MessagesComponent,  canActivate:[UserGuard]},
{path: 'message/:id', component:DetailMessageComponent,  canActivate:[UserGuard]}, 


{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
