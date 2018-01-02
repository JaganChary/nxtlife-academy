import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../shared/traverse.service';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CartValueService } from '../../shared/cart-value.service';
import {
  NgForm,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  FormsModule,
  FormGroup,
  FormArray,
  FormArrayName,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  i: number;
  cartValue: number;
  cartData: any;
  inputNumber: Array<any> = [1];
  courseId: any;
  coursesData: any;
  coursesSubscribed: object = {};

  constructor(
    private route: ActivatedRoute,
    private traverseService: TraverseService,
    private commonHttpService: CommonHttpService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {

    this.cartData = this.cartValueService.getCartData();
  }

  modelChanged() {

    if((this.inputNumber[0] < 1) || (this.inputNumber == null || undefined)) {
      console.log(this.inputNumber);
      this.inputNumber[0] = 1;
    } 
  }

  btnAdd() {
    this.inputNumber = this.inputNumber[this.i] + 1;
  }
  
  btnSubstract() {
    this.inputNumber[this.i] = this.inputNumber[this.i] - 1;
    if(this.inputNumber[this.i] < 1) {
      this.inputNumber[this.i] = 1; 
    }
  }

  // ********** Removig Cart Items ********** // 
  btnRemove(course: any) {
    this.cartValueService.removeCartData(course);
    console.log(this.cartValueService.cartData.length);
  }

  
  // Post Request Sent on BtnClick
  // btnClick() {

  // }

}
