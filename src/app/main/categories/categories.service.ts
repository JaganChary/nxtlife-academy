import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


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
      // *********** Storing Courses Data *********** //

      catg.courses.forEach((course: any) => {
        this.coursesData[course.courseId] = course;
      });

    });
    console.log(this.coursesData);
  }

  // *******  Retrieving CategoryDataById ******* //

  getCategoryDataById(id: number): Observable<any> {
    console.log('fffffffffffffffffffffffffff');

    if (this.categoriesData && this.categoriesData[id]) {
      return of(this.categoriesData[id]);
    } else {
      return this.getSaCategories()
        .map(cat =>
          cat.find((cat) => cat.courseCategoryId === id)

        )
    }
  }

  // *******  Retrieving CourseDataById ******* //

  getCourseDataById(id: number): Observable<any> {
    console.log('ssssssssssssssssssssssssssssssssssssss');
    
    if (this.coursesData && this.coursesData[id]) {
      console.log(this.coursesData);
      return of(this.coursesData[id]);
    } else {
      return this.getSaCategories().map(cats => {
        for (let i = 0; i < cats.data.length; i++) {
          let c = cats.data[i].courses.find(course => course.courseId === id);
          if (c) {
            return c;
          }
        }
      }
      )
    }
  }

  // *********** Storing Category Data *********** //

  storeCategoryData(category: Object, action: String): any {
    this.categoryData = category;
    this.addORedit = action;
  }

  // *********** Retrieve Category Data *********** //

  getCategoryData(): any {
    return this.categoryData;
  }

  // *******  Receive String 'Add' or 'Edit' ******* //

  getAction(): any {
    return this.addORedit;
  }

  // All Catgeories

  getCategories(): any {
    return this.commonHttpService.get('/categories');
  }

  // ******* Post request for adding Categories ******* //

  postCategories(data): any {
    return this.commonHttpService.post('/sa/category', data);
  }

  // ******* Put request for Editing Categories ******* //

  editCategories(id: number, data): any {
    console.log(id)
    return this.commonHttpService.put(`/sa/category/${id}`, data);
  }

  getSaCategories(): any {
    return this.commonHttpService.get('/sa/categories');
  }

}
