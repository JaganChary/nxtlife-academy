import { Injectable } from '@angular/core';

@Injectable()
export class CoursesDataService {
  coursesData: Object;
  constructor(
    
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
}
