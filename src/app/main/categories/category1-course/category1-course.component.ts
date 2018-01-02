import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { CartValueService } from '../../../shared/cart-value.service';

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
    private commonHttpService: CommonHttpService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {

    if(this.traverseService.categoriesData == null || undefined) {

      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
        this.traverseService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.traverseService.getCategoryDataById(id);
        this.courses = this.categoryData.courses;
        console.log(this.courses);
      }, (error: any) => {
        console.log(error);
      })
    } else {

        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.traverseService.getCategoryDataById(id);
        this.courses = this.categoryData.courses;
        console.log(this.courses);
    }
  }

  btnAddCart(course: any) {
    this.cartValueService.addCartData(course);
  }
}
