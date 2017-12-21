import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentComponent } from './department/department.component';
import { MainComponent } from './main.component';

import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, ValidatorFn } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Test2 } from './test2/test2.component';
 
@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        HeaderComponent,
        ContactComponent,
        SidebarComponent,
        FooterComponent,
        EmployeeFormComponent,
        DepartmentComponent,
        Test2

    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'home',
                        pathMatch: 'full'
                    },
                    {
                        path: 'home',
                        component: HomeComponent
                    },
                    {
                        path: 'contact',
                        component: ContactComponent,
                    },
                    {
                        path: 'department',
                        component: DepartmentComponent
                    },
                    {
                        path: 'employee-form',
                        component: EmployeeFormComponent
                    },
                    {
                        path: 'category',
                        loadChildren: 'app/main/categories/categories.module#CategoriesModule',
                    },
                    {
                        path: '**',
                        component: Test2
                    }
                ]
            }
        ])
    ]
})

export class MainModule {
    constructor() {

    }
}