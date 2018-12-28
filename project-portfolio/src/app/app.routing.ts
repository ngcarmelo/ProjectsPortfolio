//Crear archivo 'app.routing.ts' para las rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Las rutas de mis componentes
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



//cada ruta con su componente
const appRoutes: Routes = [
{path: '', component: AboutComponent},
{path: 'sobre-mi', component: AboutComponent},
{path: 'proyectos', component: ProjectsComponent},
{path: 'crear-proyecto', component: CreateComponent},
{path: 'contacto', component: ContactComponent}, 
{path: 'proyecto/:id', component: DetailComponent}, 
{path: 'editar-proyecto/:id', component: EditComponent}, 
{path: 'register', component:RegisterComponent}, 
{path: 'login', component:LoginComponent}, 

{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
