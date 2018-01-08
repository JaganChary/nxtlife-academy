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
  employeeAssigned: any;                // Array of assigned employees coming from server
  managersTask: any;
  courseId: any;                        // CourseId of course being assigned  
  coursesData: any;                     // The complete data of the course being assigned
  managers: any;                        // List of all managers coming from server
  employees: any;                       // List of all employees coming from server   
  allStaff: Array<any> = [];            // Array of all staff that comes from server of employees and managers
  checkValue: Array<any> = [];                  //     
  Assigned: Array<any> = [];            // Array of assigned staff
  Unassigned: Array<any> = [];          // Array of unassigned staff
  inputNumbers: Array<any> = [];
  empORmanager: String;
  date: String;
  
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

      // All Employees List

      this.getAllEmployeesList();

     
    }
    
    var d = new Date();
    console.log(d);
    var n = d.toLocaleTimeString();
    console.log(n);

    // Get Manager Task LIst

    // this.commonHttpService.getManagerTaskList()
    // .subscribe((res: any) => {
    //   console.log(res);
    // }, (err: any) => {
    //   console.log(err);
    // })
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
        this.managersTask = this.coursesData.managersTask;
        console.log(this.managersTask);
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

  // All Employees List

  getAllEmployeesList(): any {
    this.commonHttpService.getEmployeesList()
      .subscribe((res: any) => {
        this.employees = res.data;
        this.allStaff = this.employees;
        console.log('Employees: ', this.allStaff);
        this.empORmanager = 'Employees';
        this.employeeArray();
        
      }, (err: any) => {
        console.log(err);
      })
  }

  // allStaff array divided in 2 parts with property assignedEmployee = true and no such property

  // Employee Array

  employeeArray(): any {
    this.Assigned = [];
    this.Unassigned = [];
    this.empORmanager = 'Employees';
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
    console.log(this.Assigned);
    console.log(this.Unassigned);

  }

  // Managers Array
  
  managerArray(): any {
    this.Assigned = [];
    this.Unassigned = [];
    console.log(this.date);
    this.empORmanager = 'Managers';
    this.allStaff.forEach((element1: any) => {
      element1.id
      this.managersTask.forEach((elem1: any) => {
        elem1.managerId
        if(element1.id == elem1.managerId) {
          element1['assignedManager'] = true;
          element1['license'] = undefined;
          element1['expiredOn'] = "";
        } else {
          element1['license'] = undefined;
          element1['expiredOn'] = "";
        }
      })
    })

    for (let i = 0; i < this.allStaff.length; i++) {
      if(this.allStaff[i].assignedManager) {
        this.Assigned.push(this.allStaff[i]);
        
      } else {
        this.Unassigned.push(this.allStaff[i]);
      }
    }
    console.log(this.Assigned);
    console.log(this.Unassigned);

  }

  // Click to get saveEmployeeList

  btnClickEmployee(): any {
    // this.checkValue = [];
    this.allStaff = this.employees;
    this.employeeArray();
    console.log('Employees: ', this.allStaff);
  }

  // Click to get managerList

  btnClickManager(): any {
    // this.checkValue = [];
    
    // All Managers List

    this.commonHttpService.getManagersList()
      .subscribe((res: any) => {
        this.managers = res.data;
        this.allStaff = this.managers;
        console.log('Managers: ', this.allStaff);
        this.empORmanager = 'Managers';
        this.managerArray();
        
      }, (err: any) => {
        console.log(err);
      })
  }

  // Assign Button

  btnClick(): any {
    var arr = [];
    if (this.empORmanager === 'Employees') {

      for (let i = 0; i < this.allStaff.length; i++) {
        if (this.checkValue[i] == true) {
          arr.push(
            {
              courseId: this.courseId,
              employeeId: this.allStaff[i].id
            }
          )
        }
      }

      // Sending Post request with Employee Details 

      let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

      this.httpClient.post(BASEURL + '/admin/assign/course', arr, {
        headers: header
      })
        .subscribe((res: any) => {
          console.log(res);
        }, (err: any) => {
          console.log
        });

    } else if (this.empORmanager === 'Managers') {

      for (let i = 0; i < this.allStaff.length; i++) {
        if (this.checkValue[i] == true) {
          arr.push(
            {
              courseId: this.courseId,
              managerId: this.allStaff[i].id,
            }
          )
        }
      }

      let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

      this.httpClient.post(BASEURL + '/admin/assign/task', arr, {
        headers: header
      })
        .subscribe((res: any) => {
          console.log(res);
        }, (err: any) => {
          console.log
        });

    }

  }
}