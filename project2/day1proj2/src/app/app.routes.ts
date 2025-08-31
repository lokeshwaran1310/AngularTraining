import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ProjectComponent } from './pages/project/project';
import { SkillsComponent } from './pages/skills/skills';
import { ExperienceComponent } from './pages/experience/experience';
import { CertificatesComponent } from './pages/certificates/certificates';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [

    {path:'', redirectTo:"home" ,pathMatch:"full"},
    {path:'home' , component:HomeComponent,title:"Home", data: {animation: 'HomePage'}},
    {path:'about' , component:AboutComponent,title:"About", data: {animation: 'AboutPage'}},
    {path:'projects' , component:ProjectComponent,title:"Projects", data: {animation: 'ProjectsPage'}},
    {path:'skills' , component:SkillsComponent,title:"Skills", data: {animation: 'SkillsPage'}},
    {path:'experience' ,component:ExperienceComponent,title:"Experience", data: {animation: 'ExperiencePage'}},
    {path:'certificates',component:CertificatesComponent,title:"Certificates", data: {animation: 'CertificatesPage'}},
    {path:'contact' , component:ContactComponent,title:"Contact", data: {animation: 'ContactPage'}},
    {path:'**' , component:HomeComponent,title:"Home", data: {animation: 'HomePage'}}
];
