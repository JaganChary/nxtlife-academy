import { CategoriesComponent } from './categories.component';

import { Category1CourseComponent } from './category1-course/category1-course.component';
import { ChaptersComponent } from './chapters/chapters.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
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
                children: [
                    {
                        path: '',
                        component: CategoriesComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: '',
                                component: Category1CourseComponent,
                                pathMatch: 'full'
                            },
                            {
                                path: 'chapters',
                                component: ChaptersComponent,
                            }
                        ]
                    }
                    
                ]
            }
        ])
    ]
})

export class CategoriesModule {
    constructor() {

    }
}