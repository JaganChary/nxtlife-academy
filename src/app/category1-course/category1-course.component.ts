import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from '../shared/app.constant';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { TraverseService } from '../shared/traverse.service';
import { CommonHttpService } from '../shared/commonHttp.service'; 

@Component({
  selector: 'app-category1-course',
  templateUrl: './category1-course.component.html',
  styleUrls: ['./category1-course.component.css']
})

export class Category1CourseComponent implements OnInit {
  courses: any;
  categoriesData: any;
  categories: Array<any>;
  categoryData: any;
  id: Number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private traverseService: TraverseService,
    private commonHttpService: CommonHttpService
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
        console.log(this.categoryData);
        this.courses = this.categoryData.courses;
    }
  }
}  

