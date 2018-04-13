import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CartValueService } from '../../shared/cart-value.service';
import { CategoriesService } from '../categories.service';
import { CoursesService } from './courses.service';
import * as alertify from 'alertifyjs';
import { ProgressBarService } from '../../shared/progress-bar.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  courseCategoryId: number;
  courses: any;
  categoryData: any;
  role: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private cartValueService: CartValueService,
    private coursesService: CoursesService,
    private progressBarService: ProgressBarService

  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.progressBarService.startProgressBar();

    if (this.role === 'admin') {

      this.categoriesService.getCategories()
        .subscribe((res: any) => {

          this.courses = this.categoryData.courses;
          console.log(this.courses);
          console.log(this.categoryData);
        });
      }
      else if (this.role === 'sa') {
        this.route.data
          .subscribe((res: { cat: any }) => {

            this.progressBarService.endProgressBar();
            this.categoryData = res.cat;

            this.courses = this.categoryData.courses;
            // console.log(this.courses);
            // console.log(this.categoryData);
          })
      }
    }

    // Adding Course

    btnAddCart(course: any) {
      this.cartValueService.addCartData(course);
    }

    buyNow(course: any) {
      this.progressBarService.startProgressBar();
      this.cartValueService.addCartData(course);
      this.router.navigate(['main/cart']);
    }

    btnDelete(id: any, i) {
      alertify.confirm('Do you wish to delete this course',
        () => {

          this.progressBarService.startProgressBar();
          this.coursesService.deleteCourse(id)
            .subscribe((res: any) => {

              this.progressBarService.endProgressBar();
              const obj = this.courses.splice(i, 1);
              alertify.success('Course Deleted');

            }, (err: any) => {
              alertify.alert(err.msg).setHeader('Message');
              console.log(err);
            });
        },
        () => {
          alertify.error('Cancel');
        }).setHeader('Confirmation');
    }

    addCourse(): any {
      this.coursesService.storeCourseData({}, 'Add');
    }

    editCourse(course: any): any {
      this.coursesService.storeCourseData(course, 'Edit');
    }

  }
