import { MainComponent } from './main.component';

import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

// Services
import { CommonHttpService } from './shared/commonHttp.service';
import { CartValueService } from './shared/cart-value.service';
import { CategoriesService } from './categories/categories.service';
import { MainService } from './main.service';
import { LoginService } from '../login/login.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'admin',
                        loadChildren: 'app/main/admin/admin.module#AdminModule'
                    },
                    // {
                    //     path: '',
                    //     redirectTo:'admin',
                    //     loadChildren: 'app/main/admin/admin.module#AdminModule'
                    // },
                ]
            }
        ])
    ],
    providers: [CartValueService, CommonHttpService, CategoriesService, MainService, LoginService]
})

export class MainModule {
    constructor() {

    }
}