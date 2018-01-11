import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartValueService } from './shared/cart-value.service';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartValue: number = 0;
  cartData: any;

  constructor(
    private router: Router,
    private mainService: MainService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {
    this.cartData = this.cartValueService.cartObservable
    .subscribe((cartValue: number) => {
      this.cartValue = cartValue;
      console.log('Cart Value: ',this.cartValue);
      })
    
  }

  // Logout
  onLogOut() {
    this.mainService.onLogout()
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
