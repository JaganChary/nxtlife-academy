import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class MyCoursesService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }
  
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
