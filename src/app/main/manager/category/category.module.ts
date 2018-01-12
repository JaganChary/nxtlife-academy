import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';

@NgModule({

  declarations: [CategoryComponent, CourseComponent],
  imports: [
    CommonModule,
    RouterModule,
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
              }
            ]
          }
        ]
      }
    ])
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
