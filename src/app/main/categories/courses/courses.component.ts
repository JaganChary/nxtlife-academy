import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CartValueService } from '../../shared/cart-value.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  courses: any;
  categoryData: any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private cartValueService: CartValueService,
    
  ) { }

  ngOnInit() {
      
    if(this.categoriesService.categoriesData == null || this.categoriesService.categoriesData == undefined) {

      this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categoriesService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.categoriesService.getCategoryDataById(id);
        this.courses = this.categoryData.courses;
        console.log(this.courses);
        
      }, (error: any) => {
        console.log(error);
      })
    } else {

        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.categoriesService.getCategoryDataById(id);
        console.log(this.categoryData);
        this.courses = this.categoryData.courses;
        console.log(this.courses);
    }
  }

  // Adding Course

  btnAddCart(course: any) {
    this.cartValueService.addCartData(course);
  }

  buyNow(course: any) {
    this.cartValueService.addCartData(course);
  }

  addCourse(): any {
    this.router.navigate(['main/admin/category/'])
  }
}
