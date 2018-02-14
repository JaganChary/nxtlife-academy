import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.css']
})
export class TemplateTwoComponent implements OnInit {
  templateTwoForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private templatesService: TemplatesService
  ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm(): any {
    this.templateTwoForm = this.formBuilder.group({

      heading: ['', Validators.required],

      type: ['', Validators.required],

      buttons: this.formBuilder.array([
        this.getButtons()
      ])
    })
  }

  fileUpload(e: any): any {

  }

  getButtons(): any {
    return this.formBuilder.group({
      
      title: ['', Validators.required],

      description: ['', Validators.required],

    });
  }

  addButton(): any {
    const buttons = <FormArray>this.templateTwoForm.controls['buttons'];
    buttons.push(this.getButtons());
  }

  deleteButton(): any {
    
  }

  btnSubmit(): any {
    
  }

}
