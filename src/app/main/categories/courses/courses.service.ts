import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class CoursesService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }
  
  // ******* Request for deleting course ******** //

  deleteCourse(id: number): any {
    return this.commonHttpService.delete('/sa/course/' + id);
  }

  // ******* Post request for adding Courses ******* //

  postCourses(data, id): any {
    return this.commonHttpService.post(`/sa/category/${id}/course`, data);
  }
}
  