import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class MyCoursesService {
  coursesData: Object;

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  storeCoursesData(courses: any) {

    this.coursesData = {};
    courses.data.forEach((element: any) => {
      this.coursesData[element.courseId] = element;
    })
  }

  getCoursesDataById(id: number) {
    return this.coursesData[id];
  }

  // My Courses

  getMyCourses(): any {
    return this.commonHttpService.get(`/admin/my-courses`);
  }

  // Employees List

  getEmployeesList(): any {
    return this.commonHttpService.get(`/admin/employees?role=employee`);
  }

  // Managers List

  getManagersList(): any {
    return this.commonHttpService.get(`/admin/employees?role=manager`)
  }
}
