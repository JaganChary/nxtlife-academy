import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  courses: any
  constructor(
      private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
    this.commonHttpService.getMyCourses()
    .subscribe((res: any) => {
        
        this.courses = res.data;
        console.log(res.data);
    }, (err: any) => {
        console.log(err);
    })

  }
}
