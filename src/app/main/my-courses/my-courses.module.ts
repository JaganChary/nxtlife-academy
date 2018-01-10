import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MyCoursesComponent } from './my-courses.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { CoursesDataService } from './courses-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyCoursesComponent,
    AssignCourseComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
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
          },
          {
            path: 'assign/:id',
            children: [
              {
              path: '',
              component: AssignCourseComponent
              }
            ]
          }
        ]
      }
    ])
  ],
  providers: [CoursesDataService]

})
export class MyCoursesModule { }
