
import { Category1CourseComponent } from './category1-course/category1-course.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        CategoriesComponent,
        Category1CourseComponent,
        ChaptersComponent

    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        RouterModule.forChild([
            {
            
                path: '',
                component: CategoriesComponent,
                children: [
                    {
                        path: 'category/:id/courses',
                        component: Category1CourseComponent,
                    },
                    {
                        path: 'category/:id/courses/chapters',
                        component: ChaptersComponent,
                    },
                ]
            }
        ])
    ]
})

export class CategoriesModule {
    constructor() {

    }
}