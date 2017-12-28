import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { TraverseService } from '../../shared/traverse.service';  
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ActionSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  courses: any;
  categoryData: any;
  categoriesData: any;
  coursesData: any;
  inputNumber: number;
  x: number;

  constructor(
    private route: ActivatedRoute,
    private commonHttpService: CommonHttpService,
    private traverseService: TraverseService
  ) { }

  ngOnInit() { 
    if(this.traverseService.categoriesData == null || undefined) {

      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        console.log(this.coursesData);
       
      }, (error: any) => {
        console.log(error);
      
      })
    } else {

        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        console.log(this.coursesData);
      }
  }


  modelChanged() {
    console.log(typeof(this.inputNumber));
    console.log(this.inputNumber);

    if((this.inputNumber < 1) || (this.inputNumber == null || undefined)) {
      this.inputNumber = 1;

    } 

  }
  






  // ******** Post Request sent on Button Click ******** //
  // btnClick() {
  //   this.commonHttpService.postSubscription()
  //   .subscribe((res: any) => {
  //     console.log('New subscription: ', res);
  //   },(error: any) => {
  //     console.log(error);
  //   })
  // }
}
