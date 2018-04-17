import { Component, OnInit } from '@angular/core';
import { CartValueService } from '../shared/cart-value.service';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import alertify from 'alertifyjs';
import { ProgressBarService } from '../shared/progress-bar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: any;
  inputNumbers: Array<any> = [];
  cartValue: Number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartValueService: CartValueService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {

    if (this.cartData) {
      this.cartValueService.cartObservable
        .subscribe((cartValue: number) => {

          this.cartValue = cartValue;
          console.log('Cart Value: ', this.cartValue);
        }, (err: any) => {

          console.log(err);
        })
    }


    this.cartData = this.cartValueService.getCartData();

    for (let i = 0; i < this.cartData.length; i++) {

      let initialCartItems = this.inputNumbers.push(1);
    }

    console.log(this.inputNumbers);
  }

  // Check used to keep the value 1 when initializing
  modelChanged(i: number) {

    if ((this.inputNumbers[i] < 1) || (this.inputNumbers == null || undefined)) {
      this.inputNumbers[i] = 1;
      // this.cartValueService.addCartData(i);
    }
    console.log(this.inputNumbers);
  }

  // Add button to increase license number
  btnAdd(i) {
    this.inputNumbers[i] = this.inputNumbers[i] + 1;
  }

  // Add button to decrease license number
  btnSubstract(i) {
    this.inputNumbers[i] = this.inputNumbers[i] - 1;
    if (this.inputNumbers[i] < 1) {
      this.inputNumbers[i] = 1;
    }
  }

  // ********** Removig Cart Items ********** // 
  btnRemove(course: any) {
    this.cartValueService.removeCartData(course);
  }

  // Button Click to Add Item to Cart
  btnClick() {
    var arr = [];
    this.progressBarService.startProgressBar();
    for (let i = 0; i < this.cartData.length; i++) {
      arr.push({
        courseId: this.cartData[i].courseId,
        license: this.inputNumbers[i]
      });
    }
    console.log(arr);

    // Post Request Sent on BtnClick

    this.cartService.postCartItems({courseSubscribed: arr})
      .subscribe((res: any) => {
        this.progressBarService.endProgressBar();
        alertify.success(res.message);
        this.cartValueService.emptyCartData();
        this.router.navigate(['/main/category']);
        console.log(res);
      }, (err: any) => {
        this.progressBarService.endProgressBar();
        alertify.alert(err.message).setHeader('Error Message')
        console.log(err);
      })
  }

  goToCategories(): any {
    this.router.navigate(['/main/category']);
  }
}
