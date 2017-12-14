import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import {
  NgForm,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  FormsModule,
  FormGroup,
  FormArray,
  FormArrayName,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  EmailValidator
} from '@angular/forms';

import { employee, EmployeeRole } from '../shared/employeeRole.interface';
import { BASEURL } from '../shared/app.constant';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup;
  departments: Array<any>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.initForm();
  }
     
  initForm() {
    let organizationId = localStorage.getItem('organizationId');
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));
    
    this.httpClient.get(BASEURL + `/admin/organization/${organizationId}/departments`, {
      headers: header
    }
    )
    .subscribe((res: any) => {  
      this.departments = res.data;
      console.log('Response: ',res);
    }),(error: any) => {
      console.log(error);
    }
    
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],

      gender: ['', [Validators.required]],

      email: ['', Validators.compose([Validators.required, Validators.email])],

      contactNo: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      
      joiningDate: ['', [Validators.required]],
      
      employeeRoles: this.formBuilder.array([
        this.initEmployeeRole(),
      ])
    });

    console.log(this.registerForm.controls.employeeRole);
    let a = <FormArray>this.registerForm.controls.employeeRoles;
    console.log(a.controls);
    
  }

  initEmployeeRole() {
    return this.formBuilder.group({
      roleId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]]
    })
  }

  // Button to Add Employee Role

  addEmployeeRole() {
    const control = <FormArray>this.registerForm.controls['employeeRoles'];
    control.push(this.initEmployeeRole());
  }
  
  // Button to Add Employee 

  btnClick() {
    console.log('Button Clicked');
    var employee = this.registerForm.value;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(employee);
    
    // Access Token Authorization
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));

    // Retrieving organizationId
    let organizationId = localStorage.getItem('organizationId');

    // Posting Employee Details
    
    this.httpClient.post(BASEURL + '/admin/employee', [{
      fullName: employee.fullName,
      gender: employee.gender,
      email: employee.email,
      contactNo: employee.contact,
      joiningDate: employee.joiningDate,
      employeeRoles: employee.employeeRoles,
      organizationId
    }], {headers: header}).
      subscribe((res: any) => {

        // Routing to HomePage

        this.router.navigate(['home']);
        console.log('Response: ' + res);
      }, (error: any) => {
        console.log(error);
      });
  }
}
