import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ChaptersService } from '../../chapters.service';
import { TemplatesService } from '../templates.service';
import * as alertify from 'alertifyjs';
import { ProgressBarService } from '../../../../shared/progress-bar.service';

@Component({
  selector: 'app-template-three',
  templateUrl: './template-three.component.html',
  styleUrls: ['./template-three.component.css']
})
export class TemplateThreeComponent implements OnInit {
  id: any;
  templateThreeForm: FormGroup;
  radioValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private chaptersService: ChaptersService,
    private templatesService: TemplatesService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm(): any {

    this.id = this.chaptersService.getTopicId();
    console.log(this.id);

    this.templateThreeForm = this.formBuilder.group({

      topImageFile: ['', Validators.required],

      background: ['', Validators.required],

      backgroundImageFile: [],

      issue: ['', Validators.required],

      issueImageFile: [],

      incident: ['', Validators.required],

      incidentImageFile: [],

      decision: ['', Validators.required],

      decisionImageFile: [],

      conclusion: ['', Validators.required],

      conclusionImageFile: [],

      questionnaireSet: this.formBuilder.array([
        this.getquestionnaireSet()
      ])
    })
  }

  fileUpload(e: any, imageName: string): any {
    let file = e.target.files[0];
    console.log(imageName, file);
    this.templateThreeForm.controls[imageName].patchValue(file);
  }

  getquestionnaireSet(): any {
    return this.formBuilder.group({

      heading: [''],

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


  addquestionnaireSet(): any {
    const questionnaireSet = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    questionnaireSet.push(this.getquestionnaireSet());
  }

  addQuestions(questionnaireIndex: number): any {
    const questionnaireSetArray = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    const questionnaireSetGroup = <FormGroup>questionnaireSetArray.controls[questionnaireIndex];
    const questionsArray = <FormArray>questionnaireSetGroup.controls['questions'];
    console.log(questionsArray.controls[0]);
    questionsArray.push(this.getQuestions());
  }

  addOptions(questionIndex: number, questionnaireIndex: number): any {
    const questionnaireSetArray = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    const questionnaireSetGroup = <FormGroup>questionnaireSetArray.controls[questionnaireIndex];
    const questionsArray = <FormArray>questionnaireSetGroup.controls['questions'];
    const questionsGroup = <FormGroup>questionsArray.controls[questionIndex];
    const optionsArray = <FormArray>questionsGroup.controls['options'];
    optionsArray.push(this.getOptions());
  }

  deletequestionnaireSet(i): any {
    const questionnaireSet = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    questionnaireSet.removeAt(i);
  }

  deleteQuestions(questionnaireIndex: number, j: number): any {
    const questionnaireSetArray = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    const questionnaireSetGroup = <FormGroup>questionnaireSetArray.controls[questionnaireIndex];
    const questionsArray = <FormArray>questionnaireSetGroup.controls['questions'];
    questionsArray.removeAt(j);
  }

  deleteOptions(questionIndex: number, questionnaireIndex: number, k): any {
    const questionnaireSetArray = <FormArray>this.templateThreeForm.controls['questionnaireSet'];
    const questionnaireSetGroup = <FormGroup>questionnaireSetArray.controls[questionnaireIndex];
    const questionsArray = <FormArray>questionnaireSetGroup.controls['questions'];
    const questionsGroup = <FormGroup>questionsArray.controls[questionIndex];
    const optionsArray = <FormArray>questionsGroup.controls['options'];
    optionsArray.removeAt(k);
  }

  onChange(str: any): any {
    console.log(this.radioValue);
    console.log(str);
  }

  btnSubmit(): any {
    if(this.templateThreeForm.invalid) {
      return;
    }

    this.progressBarService.startProgressBar();
        
    let obj = {
      template: 'THIRD',
      caseStudies: this.templateThreeForm.value
    };
    var formInfo = this.templatesService.createFormData(obj);

    this.chaptersService.postTemplate(this.id, formInfo)
      .subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        alertify.success(res.message);
        console.log(res);

      }, (err: any) => {
        
        this.progressBarService.endProgressBar();
        alertify.alert(err.msg).setHeader('Message');
        console.log(err);
      });
  }
}
