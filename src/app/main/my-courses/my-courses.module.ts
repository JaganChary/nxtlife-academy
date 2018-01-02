import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MyCoursesComponent } from './my-courses.component';

@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: MyCoursesComponent,
            pathMatch: 'full'
          }
        ]
      }
    ])
  ]

})
export class MyCoursesModule { }
