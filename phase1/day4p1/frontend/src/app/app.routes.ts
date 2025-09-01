import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BugsComponent } from './pages/bugs/bugs';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard'},
    {path:'bugs',component:BugsComponent,title:'Bugs'},
    {path:'**',redirectTo:'login'}
];
