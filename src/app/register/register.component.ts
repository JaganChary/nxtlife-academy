import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  EmailValidator,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  addForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.initValidate();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      organization: ['', Validators.required],
      type: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  initValidate(): void {
    this.addForm = new FormGroup({
      'fullname': new FormControl(this.addForm.fullname, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i)
      ]),
      'email': new FormControl(this.addForm.email,[
        Validators.required,
        Validators.email
      ]),
      

    });
  }

  // The function here fetches form data and routes to the home page

  btnClick = () => {
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      this.router.navigate(['home']);
    }
  }
}
