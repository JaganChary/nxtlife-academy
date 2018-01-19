import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Route } from '@angular/router/src/config';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        public router: Router
    ) { }

    canActivate(): boolean {

        const token = localStorage.getItem('access_token');

        if (token) {

            return true;
        } else {

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

        } else if (role == 'sa') {
            this.router.navigate(['/main/sa']);
            return false;
        }
    }
}

