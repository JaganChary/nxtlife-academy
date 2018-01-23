import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  categoryData: any;
  categoryId: number;
  file: any;
  addCourseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
    
  ) { }

  ngOnInit() {

    this.getCategoryId();

    this.initForm();

    this.fromServer();
  }

  fromServer(): any {
    this.categoriesService.getSaCategories()
    .subscribe((res: any) => {
      console.log(res.data);
      this.categoryData = res.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  getCategoryId(): any {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
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
    formData.append('imageFile', this.file);


    this.coursesService.postCourses(formData, this.categoryId)
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }
}
