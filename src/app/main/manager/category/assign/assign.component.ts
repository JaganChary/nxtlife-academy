import { Component, OnInit } from '@angular/core';
import { AssignService } from './assign.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  courseId: any;
  assignedEmployees: any;
  unassigned: any[] = [];
  assigned: any[] = [];
  allEmployees: any;
  courses: any;

  constructor(
    private route: ActivatedRoute,
    private assignService: AssignService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    if (!this.categoryService.coursesData) {
      this.getCoursesDataFromServer();

    } else {
      this.getCoursesDataDirectly();
      this.getList();
    }
  }

  // Retrieving courses from server

  getCoursesDataFromServer(): any {
    this.categoryService.getManagerTasks()
      .subscribe((res: any) => {
        this.categoryService.storeCategoryData(res.data);
        const id = +this.route.snapshot.paramMap.get('id');
        this.courses = this.categoryService.getCourseDataByID(id);
        this.assignedEmployees = this.courses.assignedEmployees;
        
        this.getList();

      }, (err: any) => {
        console.log(err);
      })
  }

  // Retrieving courses Directly

  getCoursesDataDirectly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courses = this.categoryService.getCourseDataByID(id);
    this.assignedEmployees = this.courses.assignedEmployees;
  }

  // All Employee List

  getList(): any {
    this.assignService.getAllEmployeeList()
      .subscribe((res: any) => {
        this.allEmployees = res.data;
        this.allEmployeeArray();

      }, (err: any) => {
        console.log(err);
      })
  }

  allEmployeeArray(): any {
    
    if (this.assignedEmployees.length !== 0) {

      this.allEmployees.forEach((element: any) => {
        element.id
        this.assignedEmployees.forEach((elem: any) => {
          elem.assignedToEmployeeId
          if (element.id == elem.assignedToEmployeeId) {
            element['assignedEmployee'] = true;
          } else {
            element['checkValue'] = false;
          }
        })
      })

      for (let i = 0; i < this.allEmployees.length; i++) {
        if (this.allEmployees[i].assignedEmployee) {
          this.assigned.push(this.allEmployees[i]);

        } else {
          this.unassigned.push(this.allEmployees[i]);
        }
      }
     

    } else {

      for (let j = 0; j < this.allEmployees.length; j++) {
        this.allEmployees[j]['checkValue'] = false;
        this.unassigned.push(this.allEmployees[j]);
      }

    }
    // console.log('Unassigned', this.unassigned);
    // console.log('Assigned', this.assigned);
  }

  // Button to assign course to employee  

  btnClick(): any {
    var arr = [];

    for (let i = 0; i < this.allEmployees.length; i++) {
      if (this.allEmployees[i].checkValue == true) {
        arr.push(
          {
            courseId: this.courses.courseId,
            employeeId: this.allEmployees[i].id
          }
        )
      }
    }

    this.assignService.postEmployeeDetail(arr)
      .subscribe((res: any) => {
        console.log(res);
      }, (err: any) => {
        console.log(err);
      })
  }


}
