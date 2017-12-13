import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentComponent } from './department/department.component';
 
const routes: Routes = [
  { 
    path: 'register', 
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  { 
    path: 'login',
    component: LoginComponent, 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: '**',
    component: LoginComponent
  } 
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
