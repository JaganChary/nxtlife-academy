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
import { Observable } from 'rxjs/observable';
import { LoginService } from './login.service';
import * as alertify from 'alertifyjs';
import { ProgressBarService } from '../main/shared/progress-bar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['waddle.jacob@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
    });
  }

  // Logging In

  btnClick() {
    this.progressBarService.startProgressBar();
    const loginDetails = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    // console.log(loginDetails);

    this.loginService.onLogin(this.loginForm.value)
      .subscribe((res: any) => {
        // alertify.success('Logged In successfully');
        this.progressBarService.endProgressBar();
        this.loginService.loginStorage(res);

        this.router.navigate(['/main']);
      }, (error: any) => {
        this.progressBarService.endProgressBar();
        console.log(error);
        alertify.alert(error.msg).setHeader('Error Message');
      }
      );
  }
}
