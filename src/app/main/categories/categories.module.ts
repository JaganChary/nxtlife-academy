import { CategoriesComponent } from './categories.component';
import { ChaptersComponent } from './chapters/chapters.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { CategoriesService } from './categories.service';
import { CartService } from '../cart/cart.service';
import { CoursesComponent } from './courses/courses.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CategoriesComponent,
        ChaptersComponent,
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
                        path: '',
                        component: CategoriesComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: 'add-category',
                        component: AddCategoriesComponent
                    },
                    {
                        path: ':id/courses',
                        children: [
                            {
                                path: ':id/chapters',
                                component: ChaptersComponent,
                            },
                            {
                                path: '',
                                loadChildren: 'app/main/categories/courses/courses.module#CoursesModule',
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