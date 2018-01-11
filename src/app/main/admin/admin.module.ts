// Modules

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Components

import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { BuyComponent } from '../buy/buy.component';
import { CartComponent } from '../cart/cart.component';

// Services

import { AdminService } from './admin.service';
import { CategoriesService } from '../categories/categories.service';
import { CommonHttpService } from '../shared/commonHttp.service';
import { CartValueService } from '../shared/cart-value.service';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ContactComponent,
    BuyComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
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
          // {
          //   path: 'category',
          //   loadChildren: 'app/main/categories/categories.module#CategoriesModule'
          // },
          // {
          //   path: 'departments',
          //   loadChildren: 'app/main/departments/departments.module#DepartmentsModule'
          // },
          // {
          //   path: 'employees',
          //   loadChildren: 'app/main/employees/employees.module#EmployeesModule'
          // },
          {
            path: 'subscriptions',
            loadChildren: 'app/main/subscriptions/subscriptions.module#SubscriptionsModule'
          },
          // {
          //   path: 'my-courses',
          //   loadChildren: 'app/main/my-courses/my-courses.module#MyCoursesModule'
          // },
          // {
          //   path: 'buy/:id',
          //   component: BuyComponent,

          // },
          // {
          //   path: 'cart',
          //   component: CartComponent
          // }
        ]
      }
    ])
  ],
  providers: [AdminService, CartValueService, CommonHttpService, CategoriesService]

})
export class AdminModule { }
