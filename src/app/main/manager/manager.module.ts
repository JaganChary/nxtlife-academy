import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { Router, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ManagerService } from './manager.service';
import { CommonHttpService } from '../shared/commonHttp.service';
import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
  declarations: [
    ManagerComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagerComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'categories',
            loadChildren: 'app/main/manager/category/category.module#CategoryModule'
          }
        ]
      }
    ])
  ],
  providers: [ ManagerService, CommonHttpService, DashboardService ],
 
})
export class ManagerModule { }
