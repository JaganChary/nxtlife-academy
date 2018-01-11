import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class CategoriesService {
  categoriesData: object;
  coursesData: Object;

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  // *********** Storing categories Data *********** //

  storeCategoriesData(categories: Array<any>) {

    this.categoriesData = {};

    this.coursesData = {};

    categories.forEach((catg: any) => {
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

  // All Catgeories

  getCategories(): any {
    return this.commonHttpService.get('/categories');
    
  }


}
