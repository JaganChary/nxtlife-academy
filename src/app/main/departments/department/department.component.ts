import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  NgForm,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  NG_VALIDATORS

} from '@angular/forms';
import alertify from 'alertifyjs';

import { BASEURL } from '../../shared/app.constant';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm: FormGroup

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.departmentForm = this.formBuilder.group({
      department: ['', Validators.required]
    });
  }

  // Button to Add Department 

  btnClick() {
    console.log('Button Clicked');
    var departments = this.departmentForm.value;
    if (this.departmentForm.invalid) {
      return;
    }
    console.log(departments);

    // Retrieving organization Id
    let organizationId = localStorage.getItem('organizationId');

    var arr =
      // Posting Department Details

      this.departmentsService.addDepartment([{
        department: departments.department,
        organizationId
      }]).
        subscribe((res: any) => {
          alertify.success('Department Added Successfuly');
          
          // Saving department Details to localStorage
          localStorage.setItem('departmentDetails', JSON.stringify(res));

          // Getting the Array-Object Department Details and printing the departmentId which we obtain from it 
          let departmentDetails = JSON.parse(localStorage.getItem('departmentDetails'));
          console.log('DepartmentId: ' + departmentDetails[0].departmentId);

          // Route to home Page
          this.router.navigate(['main/admin/departments']);

        },
        (error: any) => {
          alertify.alert(error.msg).setHeader('Message');
          console.log(error);
        });
  }
}