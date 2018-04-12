import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class CoursesService {
  addORedit: String;
  courseData: any;

  constructor(
    private commonHttpService: CommonHttpService
  ) { }
  storeCourseData(course: Object, action: String): any {
    this.courseData = course;
    this.addORedit = action;
  }

  getCourseData(): any {
    return this.courseData;
  }

  getAction(): any {
    return this.addORedit;
  }
  // ******* Request for deleting course ******** //

  deleteCourse(id: number): any {
    return this.commonHttpService.delete('/sa/course/' + id);
  }

  // ******* Post request for adding Courses ******* //

  postCourses(data, id): any {
    return this.commonHttpService.post(`/sa/category/${id}/course`, data);
  }

  // ******* Put request for editing Courses ******* //

  editCourses(data, id): any {
    return this.commonHttpService.put(`/sa/course/${id}`, data);
  }

}
