import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartValueService {
  cartItems: number;
  cartData: any[] = [];
  private currentCartValue = new Subject<number>();
  cartObservable = this.currentCartValue.asObservable();

  constructor() { }

  
  // *******  Adding CartData ******* //
  addCartData(course: any) {
    
    this.cartData.push(course);
    // console.log(this.cartData);
    
    this.currentCartValue.next(this.cartData.length);
  }

  // *******  Retrieving CartData ******* //
  getCartData() {
    
    // console.log(this.cartData);
    return this.cartData;
  }

  // *******  Removing CartData ******* //
  removeCartData(course: any) {
    
    this.cartData.splice(this.cartData.indexOf(course), 1);
    
    this.currentCartValue.next(this.cartData.length);
  }


}
