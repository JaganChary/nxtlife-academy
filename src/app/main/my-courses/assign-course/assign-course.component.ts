import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASEURL } from '../../shared/app.constant';
import { MyCoursesService } from '../my-courses.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  employeeAssigned: any;                // Array of assigned employees coming from server
  managersTask: any;                    // Array which gives the managerTask, the one through which we check the Id of assigned employee 
  courseId: any;                        // CourseId of course being assigned  
  coursesData: any;                     // The complete data of the course being assigned
  managers: any;                        // List of all managers coming from server
  employees: any;                       // List of all employees coming from server   
  allStaff: Array<any> = [];            // Array of all staff that comes from server of employees and managers
  Assigned: Array<any> = [];            // Array of assigned staff
  Unassigned: Array<any> = [];          // Array of unassigned staff
  empORmanager: String;                 // Variable that checks if it's a manager or Employee

  constructor(
    private myCoursesService: MyCoursesService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {
    // Getting CourseID and respective courseData

    if (!this.myCoursesService.coursesData) {

      this.getMyCoursesFromServer();

    } else {

      this.getMyCoursesDirectly();

      // All Employees List

      this.getAllEmployeesList();
    }
  }

  // ENd of ngOnInit()

  btnAdd(a) {
    a.license = a.license + 1;
  }

  btnSubstract(a) {
    a.license = a.license - 1;
    if (a.license < 1) {
      a.license = 1;
    }
  }

  // Getting CourseID and respective courseData

  getMyCoursesFromServer(): any {
    this.myCoursesService.getMyCourses()
      .subscribe((res: any) => {
        this.myCoursesService.storeCoursesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.coursesData = this.myCoursesService.getCoursesDataById(id);
        // console.log(this.coursesData);
        this.employeeAssigned = this.coursesData.employeeAssigned;
        // console.log(this.employeeAssigned);
        this.managersTask = this.coursesData.managersTask;
        console.log('Manager Task1: ', this.managersTask);

        this.courseId = this.coursesData.courseId;

        // Employees List

        this.getAllEmployeesList();


      }, (error: any) => {
        console.log(error);

      })
  }

  getMyCoursesDirectly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.coursesData = this.myCoursesService.getCoursesDataById(id);
    // console.log(this.coursesData);
    this.employeeAssigned = this.coursesData.employeeAssigned;
    // console.log(this.employeeAssigned);
    this.managersTask = this.coursesData.managersTask;
    this.courseId = this.coursesData.courseId;
  }

  // All Employees List

  getAllEmployeesList(): any {
    this.myCoursesService.getEmployeesList()
      .subscribe((res: any) => {
        this.employees = res.data;
        this.allStaff = this.employees;
        // console.log('Employees: ', this.allStaff);
        this.empORmanager = 'Employees';
        this.employeeArray();

      }, (err: any) => {
        console.log(err);
      })
  }

  // allStaff array divided in 2 parts(Assigned and Unassigned)

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
    // console.log(this.Assigned);
    // console.log(this.Unassigned);

  }

  // Managers Array

  managerArray(): any {
    this.Assigned = [];
    this.Unassigned = [];
    this.empORmanager = 'Managers';
    this.allStaff.forEach((element1: any) => {
      element1.id
      this.managersTask.forEach((elem1: any) => {
        elem1.managerId
        if (element1.id == elem1.managerId) {
          element1['assignedManager'] = true;
          element1['license'] = 1;
          element1['expiredOn'] = "";
          element1['checkValue'] = false;
        } else {
          element1['license'] = 1;
          element1['expiredOn'] = "";
          element1['checkValue'] = false;
        }
      })
    })

    for (let i = 0; i < this.allStaff.length; i++) {
      if (this.allStaff[i].assignedManager) {
        this.Assigned.push(this.allStaff[i]);

      } else {
        this.Unassigned.push(this.allStaff[i]);
      }
    }
    // console.log(this.Assigned);
    // console.log(this.Unassigned);

  }

  // Click to show EmployeeList

  btnClickEmployee(): any {
    this.allStaff = this.employees;
    this.employeeArray();
    console.log('Employees: ', this.allStaff);
  }

  // Click to show managerList

  btnClickManager(): any {

    // All Managers List

    this.myCoursesService.getManagersList()
      .subscribe((res: any) => {
        this.managers = res.data;
        this.allStaff = this.managers;
        // console.log('Managers: ', this.allStaff);
        this.empORmanager = 'Managers';
        this.managerArray();

      }, (err: any) => {
        console.log(err);
      })
  }

  // Assign Button

  btnClick(): any {
    var arr = [];
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    if (this.empORmanager === 'Employees') {

      for (let i = 0; i < this.allStaff.length; i++) {
        if (this.allStaff[i].checkValue == true) {
          arr.push(
            {
              courseId: this.courseId,
              employeeId: this.allStaff[i].id
            }
          )
        }
      }

      // Sending Post request with Employee Details 

      this.httpClient.post(BASEURL + '/admin/assign/course', arr, {
        headers: header
      })
        .subscribe((res: any) => {
          alertify.success('Successful');
          console.log(res);
          this.router.navigate([`main/admin/my-courses`]);
        }, (err: any) => {
          alertify.alert(err.message).setHeader('Error Message');
          console.log(err);
        });

    } else if (this.empORmanager === 'Managers') {

      for (let i = 0; i < this.allStaff.length; i++) {
        if (this.allStaff[i].checkValue == true) {
          var date = this.allStaff[i].expiredOn + 'T' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
          arr.push(
            {
              managerId: this.allStaff[i].id,
              courseId: this.courseId,
              expiredOn: date,
              license: this.allStaff[i].license
            }
          )
        }
      }

      // Sending Post request with Manager Details

      this.httpClient.post(BASEURL + '/admin/assign/task', arr, {
        headers: header
      })
        .subscribe((res: any) => {
          alertify.success('Successful')
          console.log('Response: ', res);
          this.router.navigate(['main/admin/my-courses']);
        }, (err: any) => {
          alertify.alert(err.message).setHeader('Error Message');
          console.log(err);
        });

    }

  }
}