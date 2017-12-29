import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class TraverseService {
  cartItems: number;
  cartData: any[];
  response: Array<any>;
  categoriesData: object;
  coursesData: Object;

  constructor() { }

  // *********** Storing categories Data *********** //

  storeCategoriesData(categories: Array<any>) {

    this.categoriesData = {};
    
    this.coursesData = {};

    categories.forEach((catg:any)=>{
        this.categoriesData[catg.courseCategoryId] = catg;

        // *********** Storing course Data *********** //
        
        catg.courses.forEach((course: any) => {
          this.coursesData[course.courseId] = course;
          console.log(this.coursesData);
        });
        
    });
  }

  
  // *******  Retrieving CategoryDataById ******* //
  getCategoryDataById(id: number) {
    return this.categoriesData[id];
  }

  // *******  Retrieving CourseDataById ******* //
  getCourseDataById(id: number) {
    return this.coursesData[id];
  }

  // *******  Adding CartData ******* //
  addCartData() {
    this.cartData.push(this.coursesData);
    console.log(this.cartData);
    this.cartItems = this.cartData.length;
    console.log(this.cartItems);
  }

  // *******  Retrieving CartData ******* //
  getCartData() {
    console.log(this.cartData);
    return this.cartData;
  }

  // *******  Removing CartData ******* //
  removeCartData() {
    this.cartData.splice(this.cartData.indexOf(this.coursesData), 1);
    console.log(this.cartData);
  }

  

}

