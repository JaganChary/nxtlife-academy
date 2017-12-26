import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesComponent } from './employees.component';
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EmployeeFormComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: EmployeesComponent,
            pathMatch: 'full'
          },
          {
            path: 'employee-form',
            children: [
              {
                path: '',
                component: EmployeeFormComponent
              }
            ] 
          }

        ]
      }
    ])
  ],
  
})
export class EmployeesModule { }
