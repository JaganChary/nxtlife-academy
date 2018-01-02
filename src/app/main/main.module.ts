import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
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
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
 
@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        ContactComponent,
        BuyComponent,
        CartComponent

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
                        path: 'category',
                        loadChildren: 'app/main/categories/categories.module#CategoriesModule'
                    },
                    {
                        path: 'departments',
                        loadChildren: 'app/main/departments/departments.module#DepartmentsModule'
                    },
                    {
                        path: 'employees',
                        loadChildren: 'app/main/employees/employees.module#EmployeesModule'
                    },
                    {
                        path: 'subscriptions',
                        loadChildren: 'app/main/subscriptions/subscriptions.module#SubscriptionsModule'
                    },
                    {
                        path: 'my-courses',
                        loadChildren: 'app/main/my-courses/my-courses.module#MyCoursesModule'
                    },
                    {
                        path: 'buy/:id',
                        component: BuyComponent,
                       
                    },
                    {
                        path: 'cart',
                        component: CartComponent
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