import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any;
  categoryData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    if (this.categoryService.categoriesData == null || this.categoryService.categoriesData == undefined) {
      this.categoryService.getManagerTasks().
        subscribe((res: any) => {
          this.categoryService.storeCategoryData(res);
          const id = +this.route.snapshot.paramMap.get('id');
          this.categoryData = this.categoryService.getCategoryDataByID(id);
          // console.log(this.categoryData);
          this.courses = this.categoryData.courses;
          console.log(this.courses);

        }, (err: any) => {
          console.log(err);
        })
    } else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.categoryData = this.categoryService.getCategoryDataByID(id);
      // console.log(this.categoryData);
      this.courses = this.categoryData.courses;
      console.log(this.courses);

    }
  }
}
