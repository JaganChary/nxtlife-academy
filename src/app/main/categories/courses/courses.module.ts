import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CategoriesService } from '../categories.service';

@NgModule({

  declarations: [AddCoursesComponent, CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [ 
        {
          path: 'add-courses',
          component: AddCoursesComponent
        },
        {
          path: '', 
          component: CoursesComponent,
          pathMatch:'full'
        }
      ]
    )
  ],
  providers: [CategoriesService]
})
export class CoursesModule { }
