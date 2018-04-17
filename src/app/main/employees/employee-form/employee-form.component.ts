import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import * as alertify from 'alertifyjs';

import { employee, EmployeeRole } from '../employeeRole.interface';
import { BASEURL } from '../../shared/app.constant';
import { EmployeesService } from '../employees.service';
import { ProgressBarService } from '../../shared/progress-bar.service';

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
    private employeesService: EmployeesService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    this.initForm();
  }
     
  initForm() {
    
    // Get request to retrieve all roles
    this.employeesService.getRoles()
    .subscribe((res: any) => {
      this.roleIds = res;
          }, (error) => {
      console.log(error);
    })
    
    // Get request to retrieve all departments
    this.employeesService.getDepartments()
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
    this.progressBarService.startProgressBar();
    
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
    
    // Retrieving organizationId
    let organizationId = localStorage.getItem('organizationId');
    
    // Posting Employee Details
    
    this.employeesService.addEmployee({
      fullName: employee.fullName,
      gender: employee.gender,
      email: employee.email,
      contactNo: employee.contactNo,
      joiningDate: employee.joiningDate,
      employeeRoles: employee.employeeRoles,
      organizationId
    }).
      subscribe((res: any) => {
        this.progressBarService.endProgressBar();
        alertify.success(res.message);
        console.log('Request Sent');
        
        // Routing to HomePage
        this.router.navigate(['main/admin/employees']);
        
      }, (error: any) => {

        this.progressBarService.endProgressBar();
        alertify.alert(error.msg).setHeader('Error Message');
        console.log(error);
      });
  }
}
