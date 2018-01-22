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

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  file: any;
  category: any;
  addCategoryForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    
    this.addCategoryForm = this.formBuilder.group({

      categoryName: ['', Validators.required],
      
      categoryDescription: ['', Validators.required],
      
      categoryImage: ['', Validators.required]
    });
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
    formData.append('imgUrl', this.file);
    console.log(formData);
  
    this.categoriesService.postCategories(formData)
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }
}
