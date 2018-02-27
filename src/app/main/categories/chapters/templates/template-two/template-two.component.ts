import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TemplatesService } from '../templates.service';
import { ChaptersService } from '../../chapters.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.css']
})
export class TemplateTwoComponent implements OnInit {
  id: any;
  templateTwoForm: FormGroup;
  formData: FormData;
  file: Array<any> = [];
  imagesData: any;

  constructor(
    private formBuilder: FormBuilder,
    private templatesService: TemplatesService,
    private chaptersService: ChaptersService

  ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm(): any {

    this.id = this.chaptersService.getTopicId();
    console.log(this.id);

    this.templateTwoForm = this.formBuilder.group({

      heading: ['', Validators.required],

      type: ['', Validators.required],

      buttons: this.formBuilder.array([
        this.getButtons()
      ])
    })
  }

  getButtons(): any {
    return this.formBuilder.group({

      title: ['', Validators.required],

      imageFile: [Validators.required],

      description: ['', Validators.required],

    });
  }

  fileUpload(e: any, button: FormGroup): any {
    let file = e.target.files[0];
    button.controls['imageFile'].patchValue(file);
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
    let obj = {
      template: 'SECOND',
      secondTemplate: this.templateTwoForm.value
    };

    console.log(obj);
    var eee = this.templatesService.createFormData(obj);

    console.log(eee);

    this.chaptersService.postTemplate(this.id, eee)
      .subscribe((res: any) => {
        alertify.success('Success message');
        console.log(res);

      }, (err: any) => {
        alertify.alert(err.msg).setHeader('Message');
        console.log(err);
      });
  }
}
