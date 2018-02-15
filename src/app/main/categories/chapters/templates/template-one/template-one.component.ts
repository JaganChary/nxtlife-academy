import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  imagesData: any;
  topicId: number;
  templateOneForm: FormGroup;
  file: Array<any> = [];
  formData: FormData;
  imageData: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.topicId = +this.route.snapshot.paramMap.get('id');
    console.log(this.topicId);

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

  fileUploadImage(imageFile: any, i: number): any {
    this.file[i] = imageFile.target.files[0];
    this.imagesData = this.templateOneForm.value.images;
    this.imagesData.forEach((e: any) => {
      e['imageFile'] = this.file[i]
    })
    
  }

  fileUploadParaImage(imageFile: any, j: number) {
    this.templateOneForm.value.paragraphs[j]['imageFile'] = imageFile.target.files[0];
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
    this.formData = new FormData;
    this.templateOneForm.value['template'] = "FIRST";
    this.formData.append('firstTemplate', this.templateOneForm.value);
    console.log(this.templateOneForm.value);
  }
}
