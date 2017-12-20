import { Component, OnInit } from '@angular/core';
import { BASEURL } from '../shared/app.constant';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { TraverseService } from '../shared/traverse.service';
import { CommonHttpService } from '../shared/commonHttp.service'; 

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  courses: any;
  categoryData: any;
  
  constructor(
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

