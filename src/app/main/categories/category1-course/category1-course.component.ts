import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service'; 

@Component({
  selector: 'app-category1-course',
  templateUrl: './category1-course.component.html',
  styleUrls: ['./category1-course.component.css']
})

export class Category1CourseComponent implements OnInit {
  courses: any;
  categoryData: any;

  x:string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private traverseService: TraverseService,
    private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {

    if(this.traverseService.categoriesData == null || undefined) {
      console.log("request  sent");
      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.traverseService.getCategoryDataById(id);
        this.courses = this.categoryData.courses;
        this.x = `category/${this.categoryData.courseCategoryId}/courses/chapters`;
      }, (error: any) => {
        console.log(error);
      
      })
    } else {
      console.log("request not sent");
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.traverseService.getCategoryDataById(id);
        console.log(this.categoryData);
        this.x = `category/${this.categoryData.courseCategoryId}/courses/chapters`;
        this.courses = this.categoryData.courses;
    }
  }
}  

