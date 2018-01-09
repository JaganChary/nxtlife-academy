import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { TraverseService } from '../../shared/traverse.service';  
import { Router, ParamMap, ActivatedRoute } from '@angular/router';import { CartValueService } from '../../shared/cart-value.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from '../../shared/app.constant';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  courseId: number;
  coursesData: any;
  inputNumber: number;

  constructor(
    private route: ActivatedRoute,
    private commonHttpService: CommonHttpService,
    private httpClient: HttpClient,
    private traverseService: TraverseService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {
    this.inputNumber = 1; 

    if(this.traverseService.categoriesData == null || undefined) {

      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
        console.log(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        console.log(this.coursesData);
        this.courseId = this.coursesData.courseId;
       
      }, (error: any) => {
        console.log(error);
      
      })
    } else {

        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        console.log(this.coursesData);
        this.courseId = this.coursesData.courseId;
      }
  }
  
  modelChanged() {

    if((this.inputNumber < 1) || (this.inputNumber == null || undefined)) {
      console.log(this.inputNumber);
      this.inputNumber = 1;
    } 
  }

  btnAdd() {
    this.inputNumber = this.inputNumber + 1;
  }
  
  btnSubstract() {
    this.inputNumber = this.inputNumber - 1;
    if(this.inputNumber < 1) {
      this.inputNumber = 1; 
    }
  }

  btnRemove(course: any) {
    this.cartValueService.removeCartData(course);
  }

  // Post Request sent on Button Click

  btnClick() {
    var arr = [];
    arr.push({
      courseId: this.courseId,
      license: this.inputNumber
    });

    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

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
