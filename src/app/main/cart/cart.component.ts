import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../shared/traverse.service';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CartValueService } from '../../shared/cart-value.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from '../../shared/app.constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  i: number;
  cartValue: number;
  cartData: any;
  inputNumbers: Array<any> = [];
  courseId: any;
  
  constructor(
    private route: ActivatedRoute,
    private traverseService: TraverseService,
    private httpClient: HttpClient,
    private commonHttpService: CommonHttpService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {

    this.cartData = this.cartValueService.getCartData();
    
    for(let i = 0; i < this.cartData.length; i++) {
      
    let initialCartItems = this.inputNumbers.push(1);
    
    }
      
    console.log(this.inputNumbers);
  }

  // Check used to keep the value 1 when initializing
  modelChanged(i) {

    if((this.inputNumbers[i] < 1) || (this.inputNumbers == null || undefined)) {
      this.inputNumbers[i] = 1;
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
    if(this.inputNumbers[i] < 1) {
      this.inputNumbers[i] = 1; 
    }
  }

  // ********** Removig Cart Items ********** // 
  btnRemove(course: any) {
    this.cartValueService.removeCartData(course);
  }
  
  // Button Click

  btnClick() {
    var arr = [];

    for (let i = 0; i < this.cartData.length; i++) {
      arr.push({
        courseId: this.cartData[i].courseId,
        license: this.inputNumbers[i]
      });      
    }
    console.log(arr);

    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  
    // Post Request Sent on BtnClick
  
    this.httpClient.post(BASEURL + '/admin/subscription', {
      courseSubscribed: arr
    }, { headers: header })
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }

}
