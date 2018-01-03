import { Component, OnInit } from '@angular/core';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  managers: any;
  employees: any

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
    
    // Employees List

    this.commonHttpService.getEmployeesList()
      .subscribe((res: any) => {
        this.employees = res.data;
        console.log(res.data);

      }, (err: any) => {

        console.log(err);
      })

    // Managers List

    this.commonHttpService.getManagersList()
      .subscribe((res: any) => {
        this.managers = res.data;
        console.log(res.data);

      }, (err: any) => {
        console.log(err);
      })

  }
}
