import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class CategoriesService {
  addORedit: String;
  categoryData: any;
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

  storeCategoryData(category: Object, action: String): any {
    this.categoryData = category;
    this.addORedit = action;
  }
  
  getCategoryData(): any {
    return this.categoryData;
  }

  getAction(): any {
    return this.addORedit;
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

  // ******* Post request for adding Caegories ******* //

  postCategories(data): any {
    return this.commonHttpService.post('/sa/category', data);
  }

  // ******* Put request for Editing Caegories ******* //

  editCategories(id: number): any {
    console.log(id)
    return this.commonHttpService.delete("/sa/category/" + id);
  }

  getSaCategories(): any {
    return this.commonHttpService.get('/sa/categories');
  }

}
