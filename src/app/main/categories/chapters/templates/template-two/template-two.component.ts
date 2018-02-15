import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.css']
})
export class TemplateTwoComponent implements OnInit {
  templateTwoForm: FormGroup;
  formData: FormData;
  file: Array<any> = [];
  imagesData: any;

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

  fileUpload(imageFile: any, i: number): any {
    this.file[i] = imageFile.target.files[0];
    this.imagesData = this.templateTwoForm.value.buttons;
    this.imagesData.forEach((e: any) => {
      e['imageFile'] = this.file[i];
    })
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

  deleteButton(i: number): any {
    const buttons = <FormArray>this.templateTwoForm.controls['buttons'];
    buttons.removeAt(i);
  }

  btnSubmit(): any {
    this.formData = new FormData;
    this.templateTwoForm.value['template'] = "SECOND";
    this.formData.append('secondTemplate', this.templateTwoForm.value);

    console.log(this.templateTwoForm.value);
  }

}
