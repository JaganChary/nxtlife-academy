import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TemplatesService } from '../templates.service';
import { ChaptersService } from '../../chapters.service';
import alertify from 'alertifyjs';
import { ProgressBarService } from '../../../../shared/progress-bar.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  paraFile: any;
  id: any;
  imagesData: any;
  topicId: number;
  templateOneForm: FormGroup;
  file: any;
  formData: FormData;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private templatesService: TemplatesService,
    private chaptersService: ChaptersService,
    private progressBarService :ProgressBarService

  ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm() {

    this.id = this.chaptersService.getTopicId();
    console.log(this.id);


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
      imageFile: [Validators.required],
      sortOrder: ['', Validators.required]
    })
  }

  getParagraphs(): any {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [Validators.required],
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

  fileUploadImage(e: any, image: FormGroup): any {
    let file = e.target.files[0];
    image.controls['imageFile'].patchValue(file);
  }

  fileUploadParaImage(e: any, paragraph: FormGroup): any {
    this.paraFile = e.target.files[0];
    paragraph.controls['imageFile'].patchValue(this.paraFile);
  }

  addImages(): any {
    const images = <FormArray>this.templateOneForm.controls['images'];
    images.push(this.getImages());
  }

  addParagraphs(): any {
    const paragraphs = <FormArray>this.templateOneForm.controls['paragraphs'];
    paragraphs.push(this.getParagraphs());
  }

  addBullets(): any {
    const bullets = <FormArray>this.templateOneForm.controls['bullets'];
    bullets.push(this.getBullets());
  }

  addParagraphBullets(paraIndex: number): any {
    const paragraphArray = <FormArray>this.templateOneForm.controls['paragraphs'];
    const paragraphGroup = <FormGroup>paragraphArray.controls[paraIndex];
    const paraBulletArray = <FormArray>paragraphGroup.controls.bullets;
    paraBulletArray.push(this.getBullets());
  }

  deleteBullet(l: number): any {
    const bullets = <FormArray>this.templateOneForm.controls['bullets'];
    bullets.removeAt(l);
  }

  deleteParagraph(j): any {
    const paragraphs = <FormArray>this.templateOneForm.controls['paragraphs'];
    paragraphs.removeAt(j);
  }

  deleteImage(i): any {
    const images = <FormArray>this.templateOneForm.controls['images'];
    images.removeAt(i);
  }

  deleteParagraphBullet(paraIndex: number, paraBulletIndex: number): any {
    const paragraphArray = <FormArray>this.templateOneForm.controls['paragraphs'];
    const paragraphGroup = <FormGroup>paragraphArray.controls[paraIndex];
    const paraBulletArray = <FormArray>paragraphGroup.controls.bullets;
    paraBulletArray.removeAt(paraBulletIndex);
  }

  btnSubmit(): any {
    if(this.templateOneForm.invalid) {
      return;
    }
    
    this.progressBarService.startProgressBar();
        
    let obj = {
      template: 'FIRST',
      firstTemplate: this.templateOneForm.value
    };

    console.log(obj);
    var eee = this.templatesService.createFormData(obj);

    console.log(eee);

    this.chaptersService.postTemplate(this.id, eee)
      .subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        
        alertify.success(res.message);
        console.log(res);

      }, (err: any) => {
        alertify.alert(err.msg).setHeader('Error Message');
        console.log(err);
      });
  }

}
