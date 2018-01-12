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
import { AuthGuard } from '../auth-guard.service';
import { CartComponent } from './cart/cart.component';


@NgModule({
    declarations: [
        MainComponent,
        CartComponent
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
                        loadChildren: 'app/main/admin/admin.module#AdminModule',
                        canLoad: [AuthGuard]
                    },
                    {
                        path: '',
                        redirectTo: 'admin',
                        pathMatch: 'full'
                    },
                    {
                        path: 'manager',
                        loadChildren: 'app/main/manager/manager.module#ManagerModule',

                    },
                    {
                        path: 'cart',
                        component: CartComponent
                    }
                ]
            }
        ])
    ],
    providers: [CartValueService, CommonHttpService, CategoriesService, MainService, LoginService, AuthGuard]
})

export class MainModule {
    constructor() {

    }
}