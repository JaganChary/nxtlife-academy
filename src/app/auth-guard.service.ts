import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Route } from '@angular/router/src/config';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        public router: Router
    ) { }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('access_token');

        if (token) {
            console.log('What Up!');
            return true;
        } else {
            console.log('Sorry buddy Login first');
            this.router.navigate(['/login']);
            return false;
        }
    }

    canLoad(): boolean {
        const role = localStorage.getItem('role');
        console.log('role', role);
        if (role == 'admin') {
            return true;
        } else if (role == 'manager') {
            this.router.navigate(['/main/manager']);
            return false;
        }

    }

}

