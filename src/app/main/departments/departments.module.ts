import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { Router, RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { DepartmentsComponent } from './departments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
            pathMatch: 'full'
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
      }
    ])
  ],
  
})
export class DepartmentsModule { }
