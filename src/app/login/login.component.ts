import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgForm,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    if(!Storage) {
      this.router.navigate(['login']);
    }   
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
    })
  }

  // Logging In

  btnClick() {

    let loginDetails = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(loginDetails);

    this.httpClient.post('https://nxtlife-academy.ind-cloud.everdata.com/api/login', {
      username: loginDetails.username,
      password: loginDetails.password
    }).subscribe(
      (res: any) => {
        // Saving Access_Token in Local Storage 
        console.log(res);
        var organizationId = res.data.userDetails.organizationId;
        console.log(organizationId);
        localStorage.setItem('access_token', res.data.access_token);
        var Storage = res.data.access_token;
        console.log(Storage);
        this.router.navigate(['home']);
      }, (error: any) => {
        console.log(error);
      }
      )

    // Use Route Guard for Validation  
    // this.router.navigate(['home']);

  }
}
