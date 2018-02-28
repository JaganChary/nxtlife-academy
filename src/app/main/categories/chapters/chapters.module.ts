import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { ChaptersComponent } from './chapters.component';
import { AddChaptersComponent } from './add-chapters/add-chapters.component';
import { ChaptersService } from './chapters.service';
import { TemplatesService } from './templates/templates.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([
      {
        path: 'add-chapters',
        component: AddChaptersComponent
      },
      {
        path: ':id/add-page',
        loadChildren: 'app/main/categories/chapters/templates/templates.module#TemplatesModule' 
      },
      {
        path: '',
        component: ChaptersComponent
      }
    ])
  ],
  declarations: [AddChaptersComponent, ChaptersComponent],
  providers: [ CategoriesService, ChaptersService, TemplatesService ]
})
export class ChaptersModule { }
