import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartValueService } from './shared/cart-value.service';
import { MainService } from './main.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartValue: number = 0;
  cartData: any;
  role: String;

  constructor(
    private router: Router,
    private mainService: MainService,
    private loginService: LoginService,
    private cartValueService: CartValueService
  ) { 

  }

  ngOnInit() {
    this.cartData = this.cartValueService.cartObservable
      .subscribe((cartValue: number) => {
        
        this.cartValue = cartValue;
        console.log('Cart Value: ', this.cartValue);
      }, (err: any) => {

        console.log(err);
      })

      // Getting the role of the User 

      this.role = localStorage.getItem('role');
      
  }

  // Logout
  onLogOut() {
    this.mainService.logoutUser()
      .subscribe((res: any) => {

        // Clearing Access Token
        localStorage.clear();
        console.log('Access Token cleared and logged Out');
        this.router.navigate(['login']);

      }, (error: any) => {
        console.log(error);
      });
  }



}
