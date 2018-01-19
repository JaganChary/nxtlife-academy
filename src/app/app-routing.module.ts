// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';  
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { BrowserModule } from '@angular/platform-browser/src/browser';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MainModule } from './main/main.module';

// Components
import { AppComponent } from './app.component';
 
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  { 
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule', 
  },
  { 
    path: 'register', 
    loadChildren: 'app/register/register.module#RegisterModule',
  },
  {
    path: 'main',
    loadChildren: 'app/main/main.module#MainModule',
    canActivate: [ AuthGuard ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
 exports:[RouterModule]
})

export class AppRoutingModule { }
