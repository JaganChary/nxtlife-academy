import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { TraverseService } from '../../shared/traverse.service';  
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,  FormControl } from '@angular/forms';
import { ActionSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  courseId: number;
  myGroup: FormGroup;
  categoryData: any;
  categoriesData: any;
  coursesData: any;
  inputNumber: number;

  constructor(
    private route: ActivatedRoute,
    private commonHttpService: CommonHttpService,
    private traverseService: TraverseService
  ) { }

  ngOnInit() {
    this.initForm();
    this.inputNumber = 1; 

    if(this.traverseService.categoriesData == null || undefined) {

      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
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

  initForm() {
    this.myGroup = new FormGroup({
      license: new FormControl()
   });
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
