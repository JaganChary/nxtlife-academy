// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';  
import { Router } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser/src/browser';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MainModule } from './main/main.module';

// Components
import { AppComponent } from './app.component';
import { Test3 } from './Test3/test3.component';
 
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
  },
  {
    path: '**',
    component: Test3
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  // exports: [ RouterModule ],
  declarations: [
    Test3
  ]
})

export class AppRoutingModule { }
