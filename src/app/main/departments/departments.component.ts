import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from './departments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  x: string;
  departments: any;
  departmentForm: FormGroup;

  constructor(
    private departmentsService: DepartmentsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.departmentsService.getDepartments()
      .subscribe((res: any) => {

        this.departments = res.data;
        console.log('All Departments: ', res);
      }, (error: any) => {

        console.log(error);
      })
  }

  addDepartment(): any {

    // Retrieving organization Id
    this.x = 'Variable to make sure that the form does not load before button is clicked';

    this.departmentForm = this.formBuilder.group({

      department: ['', Validators.required]
    })

  }

  btnSubmit(): any {
    let organizationId = localStorage.getItem('organizationId');
    var departments = this.departmentForm.value;

    if (this.departmentForm.invalid) {
      return;
    }
    
    // Posting Department Details
    this.departmentsService.addDepartment([{
      department: departments.department,
      organizationId
    }]).
      subscribe((res: any) => {
        alertify.success('Department Added Successfuly');

        // Saving department Details to localStorage
        localStorage.setItem('departmentDetails', JSON.stringify(res));

        console.log(res[0]);
        this.departments.push(res[0]);
      },
        (error: any) => {
          alertify.alert(error.msg).setHeader('Message');
          console.log(error);
        });
  }
}
