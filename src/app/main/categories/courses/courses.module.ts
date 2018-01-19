import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ChildrenOutletContexts } from '@angular/router/src/router_outlet_context';

@NgModule({

  declarations: [AddCoursesComponent, CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
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
})
export class CoursesModule { }
