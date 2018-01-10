import { Component, OnInit } from '@angular/core';
import { BASEURL } from '../../../shared/app.constant';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  courseData: any;
  chapters: any;
  
  constructor(
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
        this.courseData = this.traverseService.getCourseDataById(id);
        this.chapters = this.courseData.chapters;

      }, (error: any) => {
        console.log(error);

      })
    } else {
        const id = +this.route.snapshot.paramMap.get('id');
        this.courseData = this.traverseService.getCourseDataById(id);
        this.chapters = this.courseData.chapters;
    }
  }
}

