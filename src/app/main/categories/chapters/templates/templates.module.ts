import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';
import { TemplateOneComponent } from './template-one/template-one.component';
import { TemplateTwoComponent } from './template-two/template-two.component';
import { TemplateThreeComponent } from './template-three/template-three.component';
import { TemplateFourComponent } from './template-four/template-four.component';
import { TemplatesService } from './templates.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplatesComponent,
        children: [
          {
            path: '1/template',
            component: TemplateOneComponent
          },
          {
            path: '2/template',
            component: TemplateTwoComponent
          },
          {
            path: '3/template',
            component: TemplateThreeComponent
          },
          {
            path: '4/template',
            component: TemplateFourComponent
          },
          {
            path: '',
            redirectTo: '1/template',
            pathMatch: 'full'
          }
        ]
      }

    ])

  ],
  declarations: [TemplatesComponent, TemplateOneComponent, TemplateTwoComponent, TemplateThreeComponent, TemplateFourComponent],
  providers: [ TemplatesService ]
})
export class TemplatesModule { }
