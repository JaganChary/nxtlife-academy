import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
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

import { LoginComponent } from '../login/login.component';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.departmentForm = this.formBuilder.group({
      department: ['', Validators.required]
    });
  }

  btnClick() {
    console.log('Button Clicked');
    var departments = this.departmentForm.value;
    if (this.departmentForm.invalid) {
      return; 
    }
    console.log(departments);
    
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));
    
    this.httpClient.post('https://nxtlife-academy.ind-cloud.everdata.com/api/admin/departments', [{
    department: departments.department,
    organizationId:1074563616
  }], {headers: header}).
    subscribe((res: any) => {
      this.router.navigate(['home']);
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }
}