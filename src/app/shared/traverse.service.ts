import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class TraverseService {
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

  
  
  

}

