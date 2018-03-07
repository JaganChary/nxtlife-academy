import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHttpService } from '../shared/commonHttp.service';
import { Router, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsService } from './departments.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    DepartmentsComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: DepartmentsComponent,
            pathMatch: 'full',
          }
        ]
      },
      
    ])
  ],
  providers: [DepartmentsService]
})
export class DepartmentsModule { }
