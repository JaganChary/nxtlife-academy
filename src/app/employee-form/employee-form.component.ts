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
import { log } from 'util';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.initForm();
  }
     
  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],

      gender: ['', [Validators.required]],

      email: ['', Validators.compose([Validators.required, Validators.email])],

      jdate: ['', [Validators.required]],

      contact: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],

      employeeRole: this.formBuilder.array([
        this.initEmployeeRole(),
      ])
    });

    console.log(this.registerForm.controls.employeeRole);
    let a = <FormArray>this.registerForm.controls.employeeRole;
    console.log(a.controls);
  }

  initEmployeeRole() {
    return this.formBuilder.group({
      departmentId: ['', [Validators.required]],
      roleId: ['', [Validators.required]]
    })
  }

  addEmployeeRole() {
    const control = <FormArray>this.registerForm.controls['employeeRole'];
    control.push(this.initEmployeeRole());
  }

  btnClick() {
    console.log('Button Clicked');
    var employee = this.registerForm.value;
    console.log(employee);
    if (this.registerForm.invalid) {
      return;
    }
    
    this.httpClient.post('https://nxtlife-academy.ind-cloud.everdata.com/api/academy/admin/employees', {
      name: employee.name,
      gender: employee.gender,
      email: employee.email,
      jdate: employee.jdate,
      contact: employee.contact,
      employeeRole: employee.employeeRole
    }).
      subscribe((res: any) => {
        console.log(`RESPONSE: <br> ${res}`);
      }, (error: any) => {
        console.log(error);
      });
  }
}
