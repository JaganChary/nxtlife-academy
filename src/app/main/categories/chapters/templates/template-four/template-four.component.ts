import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ChaptersService } from '../../chapters.service';
import { TemplatesService } from '../templates.service';
import * as alertify from 'alertifyjs';
import { ProgressBarService } from '../../../../shared/progress-bar.service';

@Component({
  selector: 'app-template-four',
  templateUrl: './template-four.component.html',
  styleUrls: ['./template-four.component.css']
})
export class TemplateFourComponent implements OnInit {
  a: any;
  booleanValue: any;
  id: number;
  templateFourForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chaptersService: ChaptersService,
    private templatesService: TemplatesService,
    private progressBarService :ProgressBarService

  ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm(): any {

    this.id = this.chaptersService.getTopicId();

    this.templateFourForm = this.formBuilder.group({

      heading: ['', Validators.required],

      questions: this.formBuilder.array([
        this.getQuestions()
      ])

    })
  }

  getQuestions(): any {
    return this.formBuilder.group({

      question: ['', Validators.required],

      type: ['', Validators.required],

      options: this.formBuilder.array([
        this.getOptions(),
        this.getOptions()
      ])
    })
  }

  getOptions(): any {
    return this.formBuilder.group({

      answer: ['', Validators.required],

      correct: ['', Validators.required],

      description: ['', Validators.required]

    })
  }

  onChange(e: any): any {
    console.log(e);
  }

  addQuestions(): any {
    const questions = <FormArray>this.templateFourForm.controls['questions'];
    questions.push(this.getQuestions());
  }

  addOptions(questionIndex: number): any {
    const questionsArray = <FormArray>this.templateFourForm.controls['questions'];
    const questionsGroup = <FormGroup>questionsArray.controls[questionIndex];
    const optionsArray = <FormArray>questionsGroup.controls['options'];
    optionsArray.push(this.getOptions());
  }

  deleteQuestions(i: number): any {
    const questions = <FormArray>this.templateFourForm.controls['questions'];
    questions.removeAt(i);
  }

  deleteOptions(questionIndex: number, optionIndex: number): any {
    const questionsArray = <FormArray>this.templateFourForm.controls['questions'];
    const questionsGroup = <FormGroup>questionsArray.controls[questionIndex];
    const optionsArray = <FormArray>questionsGroup.controls['options'];
    optionsArray.removeAt(optionIndex);
  }

  sendFormData(): any {
    let obj = {
      template: 'FOURTH',
      fourthTemplate: this.templateFourForm.value
    };
    var formInfo = this.templatesService.createFormData(obj);

    this.chaptersService.postTemplate(this.id, formInfo)
      .subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        alertify.success(res.message);
        console.log(res);

      }, (err: any) => {
        this.progressBarService.endProgressBar();
        console.log(err);
        alertify.alert(err.msg).setHeader('Error Message');
      });
  }

  btnSubmit(): any {

    if(this.templateFourForm.invalid) {
      return;
    }
    this.progressBarService.startProgressBar();
        
    this.templateFourForm.value.questions.forEach((elem) => {

      let b = elem.type;
      elem = elem.options;

        // Single choice
      if (b === 'SINGLECHOICE') {
        
        let x = elem.filter((elem2) => {
          return elem2.correct == "true";
        })
      
        if (x.length === 1) {
          this.sendFormData();
          
        } else {
           console.log(x);
           this.progressBarService.endProgressBar();
          alertify.alert('Please select only one answer as true').setHeader('Message');
        }

        // Multiple choice
      } else if (b === 'MULTIPLECHOICE') {
        this.a = elem.find((elem1) => {
          return elem1.correct == "true";
        })

        if (this.a == undefined) {
          this.progressBarService.endProgressBar();   
          alertify.alert('Please select atleast one answer as true').setHeader('Message');
        } else {
          this.sendFormData();
        }
      }
    });
  }
}
