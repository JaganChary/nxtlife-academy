import { Component, OnInit } from '@angular/core';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from '../../../shared/app.constant';
import { CoursesDataService } from '../../../shared/courses-data.service';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  employeeAssigned: any;
  managerTask: any;
  courseId: any;
  coursesData: any;
  managers: any;
  employees: any;
  allStaff: Array<any> = [];
  employeeId: Array<any> = [];
  Assigned: Array<any> = [];
  Unassigned: Array<any> = [];

  constructor(
    private commonHttpService: CommonHttpService,
    private traverseService: TraverseService,
    private coursesDataService: CoursesDataService,
    private route: ActivatedRoute,
    private httpClient: HttpClient

  ) { }

  ngOnInit() {
    // Getting CourseID and respective courseData

    if (!this.coursesDataService.coursesData) {

      this.getMyCoursesFromServer();

    } else {

      this.getMyCoursesDirectly();

      // Employees List

      this.getAllEmployeesList();

    }
  }
  // ENd of ngOnInit()

  // Getting CourseID and respective courseData

  getMyCoursesFromServer(): any {
    this.commonHttpService.getMyCourses()
      .subscribe((res: any) => {
        this.coursesDataService.storeCoursesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.coursesDataService.getCoursesDataById(id);
        // console.log(this.coursesData);
        this.employeeAssigned = this.coursesData.employeeAssigned;
        // console.log(this.employeeAssigned);
        this.managerTask = this.coursesData.managerTask;
        console.log(this.managerTask);
        this.courseId = this.coursesData.courseId;

        // Employees List

        this.getAllEmployeesList();


      }, (error: any) => {
        console.log(error);

      })
  }

  getMyCoursesDirectly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.coursesData = this.coursesDataService.getCoursesDataById(id);
    // console.log(this.coursesData);
    this.employeeAssigned = this.coursesData.employeeAssigned;
    // console.log(this.employeeAssigned);
    this.courseId = this.coursesData.courseId;
  }

  // Employees List

  getAllEmployeesList(): any {
    this.commonHttpService.getEmployeesList()
      .subscribe((res: any) => {
        this.employees = res.data;
        this.allStaff = this.employees;
        // console.log('Employees: ', this.allStaff);
        this.employeeArray();
      }, (err: any) => {
        console.log(err);
      })
  }

  // allStaff array divided in 2 parts with property assignedEmployee = true and no such property

  employeeArray(): any {
    this.allStaff.forEach((element: any) => {
      element.id;
      this.employeeAssigned.forEach((elem: any) => {
        elem.assignedToEmployeeId;
        if (elem.assignedToEmployeeId == element.id) {
          element['assignedEmployee'] = true;
        } 
      })
      
    })
    for (let i = 0; i < this.allStaff.length; i++) {
      if (this.allStaff[i].assignedEmployee) {
        this.Assigned.push(this.allStaff[i]);
        
      } else {
        this.Unassigned.push(this.allStaff[i]);
        
      }
    }
    // console.log(this.empAssigned);
    // console.log(this.empUnassigned);
    
  }

  managerArray(): any {
    this.allStaff.forEach((element: any) => {
      element.id;
      this.managerTask.forEach((elem: any) => {
        elem.managerId
      })
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

    for (let i = 0; i < this.allStaff.length; i++) {
      if (this.employeeId[i] == true) {
        arr.push(
          {
            courseId: this.courseId,
            employeeId: this.allStaff[i].id
          }
        )
      }
    }
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    this.httpClient.post(BASEURL + '/admin/assign/course', arr, {
      headers: header
    })
      .subscribe((res: any) => {
        console.log(res);
      }, (err: any) => {
        console.log
      });
  }
}