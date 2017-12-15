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
import { log } from 'util';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup;
  departments: Array<any>;
  departmentId: any;
  roleIds: Array<any>;
  roleId: any;

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
    
    // Get request to retrieve all roles
    this.httpClient.get(BASEURL + '/admin/role', {
      headers: header
    }).
    subscribe((res: any) => {
      this.roleIds = res;
          }, (error) => {
      console.log(error);
    })
    
    // Get request to retrieve all departments
    this.httpClient.get(BASEURL + `/admin/organization/${organizationId}/departments`, {
      headers: header
    })
    .subscribe((res: any) => {  
      this.departments = res.data;
    },(error: any) => {
      console.log(error);
    })
    
    // Error validation

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
    
    
  }

  // validations for employeeRole array Object 

  initEmployeeRole() {
    return this.formBuilder.group({
      roleId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]]
    })
  }

  // DepartmentId Selection
  onChange(e: any) {
    console.log('Department Selected: '+ e.department);
    console.log('DepartmentId: '+ e.departmentId);
  }
  
  // RoleId Selection
  onChanged(e: any) {
    console.log('Role: ', e.role);
    console.log('RoleId: ', e.id);
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

    // Accessing the roleId
    employee.employeeRoles.forEach((e: any) => {
      e.roleId = e.roleId.id;
    });
    
    // Accessing the departmentId
    employee.employeeRoles.forEach((e:any)=>{
      e.departmentId = e.departmentId.departmentId; 
    });
      
    // Access Token Authorization
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));

    // Retrieving organizationId
    let organizationId = localStorage.getItem('organizationId');
    console.log('OrganizationId: ',organizationId);
    // Posting Employee Details
    
    this.httpClient.post(BASEURL + '/admin/employee',  {
      fullName: employee.fullName,
      gender: employee.gender,
      email: employee.email,
      contactNo: employee.contactNo,
      joiningDate: employee.joiningDate,
      employeeRoles: employee.employeeRoles,
      organizationId
    }, {headers: header}).
      subscribe((res: any) => {

        // Routing to HomePage

        this.router.navigate(['home']);
        console.log('Response: ' + res);
      }, (error: any) => {
        console.log(error);
      });
  }
}
