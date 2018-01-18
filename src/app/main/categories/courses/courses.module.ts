import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddCoursesComponent, AddCategoriesComponent]
})
export class CoursesModule { }
