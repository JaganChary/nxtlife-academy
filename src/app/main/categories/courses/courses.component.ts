import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CartValueService } from '../../shared/cart-value.service';
import { CategoriesService } from '../categories.service';
import { CoursesService } from './courses.service';

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
    private coursesService: CoursesService

  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((res: {cat: any}) => {
        this.categoryData = res.cat;
        
        this.courses = this.categoryData.courses;
        console.log(this.categoryData);
      })

      this.role = localStorage.getItem('role');
  }

  // Adding Course

  btnAddCart(course: any) {
    this.cartValueService.addCartData(course);
  }

  buyNow(course: any) {
    this.cartValueService.addCartData(course);
    this.router.navigate(['main/cart']);
  }

  btnDelete(id: any, i) {
    this.coursesService.deleteCourse(id)
      .subscribe((res: any) => {
        console.log(i);
        let obj = this.courses.splice(i, 1);
        console.log(obj);

        console.log(res);
      }, (err: any) => {
        console.log(err);
      })
  }

  addCourse(): any {
    this.coursesService.storeCourseData({}, 'Add');
  }

  editCourse(course: any): any {
    this.coursesService.storeCourseData(course, 'Edit');
  }

}
