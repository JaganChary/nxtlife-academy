import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class CategoryService {
  categoriesData: object;
  coursesData: object;

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  // Get Manager Tasks
  getManagerTasks(): any {
    return this.commonHttpService.get('/manager/my-tasks');
  }

  // Renounce License
  renounceLicense(license, id): any {
    return this.commonHttpService.put(`/manager/task/${id}/license/${license}`, {});
  }

  // Store Categories

  storeCategoryData(categories: Array<any>) {
    this.categoriesData = {};
    this.coursesData = {};

    categories.forEach((elem: any) => {
      this.categoriesData[elem.caurseCategoryId] = elem;
      
      elem.courses.forEach((course: any) => {
        this.coursesData[course.courseId] = course;
      })
    })
  }

  // Retrieving categoryData by Id

  getCategoryDataByID(id: number) {
    return this.categoriesData[id];
  }
  
  // Retrieving courseData by Id 
  
  getCourseDataByID(id: number) {
    return this.coursesData[id];
  }


  
}
