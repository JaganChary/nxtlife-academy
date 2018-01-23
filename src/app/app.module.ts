// Modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
 
// Components
import { AppComponent } from './app.component';

// Main Routing Module
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthGuard } from './auth-guard.service';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { CommonHttpService } from './main/shared/commonHttp.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFontAwesomeModule
  ],
  providers: [ CommonHttpService, AuthGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
