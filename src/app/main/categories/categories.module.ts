import { CategoriesComponent } from './categories.component';
import { CoursesComponent } from './courses/courses.component';
import { ChaptersComponent } from './chapters/chapters.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { CategoriesService } from './categories.service';

@NgModule({
    declarations: [
        CategoriesComponent,
        CoursesComponent,
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
                                component: CoursesComponent,
                                pathMatch: 'full'
                            },
                            {
                                path: 'chapters/:id',
                                component: ChaptersComponent,
                            }
                        ]
                    }
                    
                ]
            }
        ])
    ],
    providers: [CategoriesService]
})

export class CategoriesModule {
    constructor() {

    }
}