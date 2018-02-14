import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  templateOneForm: FormGroup;
  file: Array<any> = [];
  formData: FormData;
  imageData: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm() {
    this.templateOneForm = this.formBuilder.group({

      heading: ['', Validators.required],
      
      images: this.formBuilder.array([
        this.getImages()
      ]),

      paragraphs: this.formBuilder.array([
        this.getParagraphs()
      ]),

      bullets: this.formBuilder.array([
        this.getBullets()
      ])
    })
  }

  getImages(): any {
    return this.formBuilder.group({
      title: ['', Validators.required],
      sortOrder: ['', Validators.required]
    })
  }

  getParagraphs(): any {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imagePosition: ['', Validators.required],
      sortOrder: ['', Validators.required],
      bullets: this.formBuilder.array([
        this.getBullets()
      ])
    })
  }

  getBullets(): any {
    return this.formBuilder.group({
      bullet: ['', Validators.required],
      sortOrder: ['', Validators.required]
    })
  }

  addImages(): any {
    const images = <FormArray>this.templateOneForm.controls['images'];
    images.push(this.getImages());
  }

  addParagraphs(): any {
    const paragraphs = <FormArray>this.templateOneForm.controls['paragraphs'];
    paragraphs.push(this.getParagraphs());
  }

  addParagraphBullets(paraIndex: number): any {
    const paragraphArray = <FormArray>this.templateOneForm.controls['paragraphs'];
    const paragraphGroup = <FormGroup>paragraphArray.controls[paraIndex];
    const paraBulletArray = <FormArray>paragraphGroup.controls.bullets;
    paraBulletArray.push(this.getBullets());
  }

  addBullets(): any {
    const bullets = <FormArray>this.templateOneForm.controls['bullets'];
    bullets.push(this.getBullets());
  }
  
  deleteBullet(): any {

  }

  deleteParagraph(): any {

  }

  deleteImage(): any {

  }

  deleteParagraphBullet(): any {

  }
}
