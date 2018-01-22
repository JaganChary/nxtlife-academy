import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  file: any;
  addCourseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
    
  ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm(): any {
    this.addCourseForm = this.formBuilder.group({
      
      courseName: ['', Validators.required],

      courseDescription: ['', Validators.required]
    })
  }

  fileUpload(imageFile: any): any {
    this.file = imageFile.target.files[0];
    console.log(this.file);
  }

  btnClick(): any {
    let formData = new FormData();

    formData.append('course', this.addCourseForm.value.courseName);
    formData.append('description', this.addCourseForm.value.courseDescription);
    formData.append('imageUrl', this.file);


    this.categoriesService.postCourses(formData)
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }
}
