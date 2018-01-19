import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgForm,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '@angular/forms';
import { BASEURL } from '../main/shared/app.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  addForm: FormGroup;
  // passwordRegex: string = '/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      organization: ['', Validators.required],

      type: ['', Validators.required],

      fullname: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', Validators.compose([Validators.required, Validators.email])],

      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],

      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }


  // The function here fetches form data and routes to the home page

  btnClick = () => {
    var user = this.addForm.value;
    if (this.addForm.invalid) {
      return;
    }
    console.log(user);
    this.httpClient.post(BASEURL + '/organization', {

      organization: user.organization,
      type: user.type,
      fullName: user.fullname,
      email: user.email,
      password: user.password,
      contactNo: user.contact

    }).subscribe( (res: any) => {

        console.log(res.id);
        if (res) {
          this.router.navigate(['login']);
        }
      },
      (error: any) => {
        console.log(error);
      }
      )


  }
}
