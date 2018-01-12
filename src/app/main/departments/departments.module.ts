import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import { CommonHttpService } from '../shared/commonHttp.service';
import { Router, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsService } from './departments.service';


@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentsComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: DepartmentsComponent,
            pathMatch: 'full',
          },
          {
            path: 'department',
            children: [
              {
                path: '',
                component: DepartmentComponent
              }
            ]
          }
        ]
      },
      
    ])
  ],
  providers: [DepartmentsService]
})
export class DepartmentsModule { }
