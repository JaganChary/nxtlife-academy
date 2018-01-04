import { Component, OnInit } from '@angular/core';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from '../../../shared/app.constant';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  courseId: any;
  coursesData: any;
  managers: any;
  employees: any;
  allStaff: Array<any> = [];
  employeeId: Array<any> = [];

  constructor(
    private commonHttpService: CommonHttpService,
    private traverseService: TraverseService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
    
  ) { }

  ngOnInit() {

    // Getting CourseId

    if(this.traverseService.categoriesData == null || undefined) {

      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
        console.log(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        this.courseId = this.coursesData.courseId;
        
      }, (error: any) => {
        console.log(error);
      
      })
    } else {

        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.traverseService.getCourseDataById(id);
        console.log(this.coursesData);
        this.courseId = this.coursesData.courseId;
      }

    // Employees List

    this.commonHttpService.getEmployeesList()
      .subscribe((res: any) => {
        this.employees = res.data;
        this.allStaff = this.employees;
        console.log('Employees: ', this.allStaff);
      }, (err: any) => {

        console.log(err);
      })
  }

  // Click to get saveEmployeeList

  btnClickEmployee(): any {
    this.employeeId = []; 
    this.allStaff = this.employees;
    console.log('Employees: ', this.allStaff);
  }

  // Click to get managerList

  btnClickManager(): any {
    this.employeeId = [];
    this.commonHttpService.getManagersList()
      .subscribe((res: any) => {
        this.managers = res.data;
        this.allStaff = this.managers;
        console.log('Managers: ', this.allStaff);

      }, (err: any) => {
        console.log(err);
      })
  }

  // Assign Button

  btnClick(): any {
    var arr = [];

    for(let i = 0; i < this.allStaff.length; i++) {
      if(this.employeeId[i] == true) {
        arr.push(
          {
            courseId: this.courseId,
            employeeId: this.allStaff[i].id
          }
        )
      }
    }
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    
    this.httpClient.post(BASEURL + '/admin/assign/course', arr ,{
      headers: header
    })
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log
    });
  }
}