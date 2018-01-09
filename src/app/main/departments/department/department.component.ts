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

import { BASEURL } from '../../../shared/app.constant';

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
  
  // Button to Add Department 

  btnClick() {
    console.log('Button Clicked');
    var departments = this.departmentForm.value;
    if (this.departmentForm.invalid) {
      return; 
    }
    console.log(departments);
    // Access Token  Authorization
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));
    
    // Retrieving organization Id

    let organizationId = localStorage.getItem('organizationId');
    
    // Posting Department Details
    
    this.httpClient.post(BASEURL + '/admin/departments', [{
    department: departments.department,
    organizationId
  }], {headers: header}).
    subscribe((res: any) => {

      // Route to home Page
      this.router.navigate(['main/home']);
      
      // Printing Response 

      // console.log('Department Detail: ' + res);
      // console.log('Stringified response: ' + JSON.stringify(res));

      // Saving department Details to localStorage

      localStorage.setItem('departmentDetails', JSON.stringify(res));

      // Getting the Array-Object Department Details and printing the departmentId which we obtain from it 

      let departmentDetails = JSON.parse(localStorage.getItem('departmentDetails'));
      console.log('DepartmentId: ' + departmentDetails[0].departmentId);
    },
    (error: any) => {
      console.log(error); 
    });
  }
}