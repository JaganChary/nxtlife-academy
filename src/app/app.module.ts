
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, ValidatorFn } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentComponent } from './department/department.component';
import { CategoriesComponent } from './categories/categories.component';
import { Category1CourseComponent } from './category1-course/category1-course.component';
import { TraverseService } from './shared/traverse.service';
import { CommonHttpService } from './shared/commonHttp.service';
import { ChaptersComponent } from './chapters/chapters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContactComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EmployeeFormComponent,
    DepartmentComponent,
    CategoriesComponent,
    Category1CourseComponent,
    ChaptersComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, AuthGuard, TraverseService, CommonHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
