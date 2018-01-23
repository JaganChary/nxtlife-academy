import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CategoriesService } from '../categories.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CoursesService } from './courses.service';

@NgModule({

  declarations: [AddCoursesComponent, CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
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
  providers: [CategoriesService, CoursesService]
})
export class CoursesModule { }
