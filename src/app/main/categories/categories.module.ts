import { CategoriesComponent } from './categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { CategoriesService } from './categories.service';
import { CartService } from '../cart/cart.service';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResolveDataService } from '../shared/resolve-category.service';
import { ResolveCourseService } from '../shared/resolve-course.service';

@NgModule({
    declarations: [
        CategoriesComponent,
        AddCategoriesComponent

    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'add-category',
                        component: AddCategoriesComponent
                    },
                    {
                        path: '',
                        component: CategoriesComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: ':id/courses',
                        children: [
                            {
                                path: ':id/chapters',
                                loadChildren: 'app/main/categories/chapters/chapters.module#ChaptersModule',
                                resolve: {
                                    cats: ResolveCourseService
                                }
                            },
                            {
                                path: '',
                                loadChildren: 'app/main/categories/courses/courses.module#CoursesModule',
                                resolve: {
                                    cat: ResolveDataService
                                }
                            }
                        ]
                    }

                ]
            }
        ])
    ],
    providers: [CategoriesService, ResolveDataService, ResolveCourseService]
})

export class CategoriesModule {
    constructor() {

    }
}