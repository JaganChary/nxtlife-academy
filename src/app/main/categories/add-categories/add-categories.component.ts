import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../../shared/progress-bar.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  image: any;
  id: any;
  addORedit: any;
  categoryData: any;
  file: any;
  category: any;
  addCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private progressBarService: ProgressBarService

  ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm() {

    this.categoryData = this.categoriesService.getCategoryData();
    console.log(this.categoryData, 'category data');


    if (this.categoryData === undefined) {
      console.log('jhgfhfh');
      this.router.navigate(['/main/category']);

    } else {

      this.id = this.categoryData.courseCategoryId;
      this.addORedit = this.categoriesService.getAction();
      if (this.addORedit === 'Add') {

        this.addCategoryForm = this.formBuilder.group({

          categoryName: ['', Validators.required],

          categoryDescription: ['', Validators.required],

          categoryImage: ['', Validators.required]
        });

      } else if (this.addORedit === 'Edit') {

        this.addCategoryForm = this.formBuilder.group({

          categoryName: [this.categoryData.category, Validators.required],

          categoryDescription: [this.categoryData.description, Validators.required],

          categoryImage: [this.categoryData.imageUrl, Validators.required]
        });

        this.image = this.addCategoryForm.controls.categoryImage.value;
      }
    }
  }
  // Change Event shows the details about the file

  fileUpload(e: any): any {

    if (e.target.files[0] === undefined) {
      
      return;
    } else {
      
      this.file = e.target.files[0];
      console.log(this.file);

      if (e.target.files || e.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (e: any) => {
          this.image = e.target.result;
        }
      }
    }
  }

  btnClick(): any {
    this.progressBarService.startProgressBar();
    let formData = new FormData();

    formData.append('category', this.addCategoryForm.value.categoryName);
    formData.append('description', this.addCategoryForm.value.categoryDescription);
    formData.append('imageFile', this.file);
    console.log(formData);

    if (this.addORedit === 'Add') {
      
      this.categoriesService.postCategories(formData)
        .subscribe((res: any) => {
          this.progressBarService.endProgressBar();
          this.router.navigate(['/main/category']);
          alertify.success(res.message);
          console.log(res);
          // this.ngProgress.done();
        }, (err: any) => {
          this.progressBarService.endProgressBar();
          alertify.alert(err.msg).setHeader('Message');
          console.log(err);
        })
    } else if (this.addORedit === 'Edit') {

      this.categoriesService.editCategories(this.id, formData)
        .subscribe((res: any) => {
          this.progressBarService.endProgressBar();
          alertify.success(res.message);
          this.router.navigate(['/main/category']);
          console.log(res);
        }, (err: any) => {
          this.progressBarService.endProgressBar();
          alertify.alert(err.msg).setHeader('Message');
          console.log(err);
        })
    }

  }
}
