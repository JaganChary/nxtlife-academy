import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import alertify from 'alertifyjs';
import { ProgressBarService } from '../../../shared/progress-bar.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  license: any;
  courses: any;
  categoryData: any;
  renounceForm: FormGroup;
  renounceCourseObject: object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {

    if (!this.categoryService.categoriesData) {
      this.fromServer();

    } else {
      this.directly();
    }
  }

  // From Server 

  fromServer(): any {
    this.progressBarService.startProgressBar();

    this.categoryService.getManagerTasks().
      subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        this.categoryService.storeCategoryData(res.data);
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.categoryService.getCategoryDataByID(id);
        // console.log(this.categoryData);
        this.courses = this.categoryData.courses;
        console.log(this.courses);

      }, (err: any) => {
        console.log(err);
      })
  }

  // Directly

  directly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryData = this.categoryService.getCategoryDataByID(id);
    // console.log(this.categoryData);
    this.courses = this.categoryData.courses;
    console.log(this.courses);
  }

  onLicenseChange(event): any {
    this.license = event;
    if(this.license < 1) {
      this.license = 1;
    } else if(this.license > this.courses) {

    }
    console.log(this.license);
  }

  btnRenounce(course): any {
    this.renounceCourseObject = course;
    console.log(course);
  }

  btnSubmit(id: number) {
    console.log(id);
    this.progressBarService.startProgressBar();
    
    this.categoryService.renounceLicense(this.license, id)
    .subscribe((res: any) => {

      this.progressBarService.endProgressBar();
      alertify.success(res.message);
      console.log(res);
    }, (err: any) => {
      alertify.alert(err.message).setHeader('Error Message');
      console.log(err);
    })
  }

}
