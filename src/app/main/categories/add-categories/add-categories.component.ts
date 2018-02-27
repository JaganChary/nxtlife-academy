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

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  id: any;
  addORedit: any;
  categoryData: any;
  file: any;
  category: any;
  addCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router

  ) { }

  ngOnInit() {
    
    this.initForm();

  }

  initForm() {

    this.categoryData = this.categoriesService.getCategoryData();
    console.log(this.categoryData,'category data');
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
    }
  }

  // Change Event shows the details about the file

  fileUpload(imageFile: any): any {
    console.log(imageFile.target.files[0]);
    this.file = imageFile.target.files[0];
  }

  btnClick(): any {
    let formData = new FormData();

    formData.append('category', this.addCategoryForm.value.categoryName);
    formData.append('description', this.addCategoryForm.value.categoryDescription);
    formData.append('imageFile', this.file);
    console.log(formData);

    if (this.addORedit === 'Add') {

      this.categoriesService.postCategories(formData)
        .subscribe((res: any) => {
          this.router.navigate(['/main/category']);
          console.log(res);
        }, (err: any) => {
          console.log(err);
        })
    } else if(this.addORedit === 'Edit') {

      this.categoriesService.editCategories(this.id,formData)
        .subscribe((res: any) => {
          this.router.navigate(['/main/category']);
          console.log(res);
        }, (err: any) => {
          console.log(err);
        })
    }

  }
}
