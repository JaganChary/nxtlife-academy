// Modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, ValidatorFn } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
 
// Components
import { AppComponent } from './app.component';

// Main Routing Module
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthGuard } from './shared/auth-guard.service';
import { CommonHttpService } from './shared/commonHttp.service';
import { TraverseService } from './shared/traverse.service';
import { CartValueService } from './shared/cart-value.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [HttpClientModule, AuthGuard, TraverseService, CommonHttpService, CartValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
