import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router
    ) { }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('access_token');

        if (token) {
            return true;
        } else {
            this.router.navigate(['\login']);
            return false;
        }
    }
}