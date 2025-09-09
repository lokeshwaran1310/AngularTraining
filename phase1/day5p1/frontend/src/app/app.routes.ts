import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BugsComponent } from './pages/bugs/bugs';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.gurad';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[AuthGuard]},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[AuthGuard,RoleGuard('ADMIN')]},
    {path:'unauthorized',component:UnauthorizedComponent,title:'Unauthorized'},
    {path:'**',redirectTo:'dashboard'}
];
