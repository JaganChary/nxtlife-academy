import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { AssignComponent } from './assign/assign.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AssignService } from './assign/assign.service';

@NgModule({

  declarations: [CategoryComponent, CourseComponent, ChaptersComponent, AssignComponent],
  imports: [
    CommonModule,
    // RouterModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: CategoryComponent,
            pathMatch: 'full'
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: CourseComponent,
                pathMatch: 'full'
              },
              {
                path: 'assign',
                component: AssignComponent
              },
              {
                path: 'chapters/:id',
                component: ChaptersComponent
              }
            ]
          },


        ]
      }
    ])
  ],
  providers: [CategoryService, AssignService ]
})
export class CategoryModule { }
