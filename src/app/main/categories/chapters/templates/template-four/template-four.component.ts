import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-template-four',
  templateUrl: './template-four.component.html',
  styleUrls: ['./template-four.component.css']
})
export class TemplateFourComponent implements OnInit {
  templateFourForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm(): any {

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

  addQuestions(): any {
    
  } 
  
  addOptions(): any {

  }

  deleteQuestions(): any {

  }

  deleteOptions(): any {
    
  }

  
}
