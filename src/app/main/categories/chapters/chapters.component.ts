import { Component, OnInit } from '@angular/core';
import { BASEURL } from '../../shared/app.constant';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CategoriesService } from '../categories.service';

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
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {

    if (!this.categoriesService.categoriesData) {
      this.fromServer();

    } else {
      this.directly();
    }
  }

  fromServer(): any {
    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categoriesService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.courseData = this.categoriesService.getCourseDataById(id);
        this.chapters = this.courseData.chapters;

      }, (error: any) => {
        console.log(error);

      })
  }

  directly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseData = this.categoriesService.getCourseDataById(id);
    this.chapters = this.courseData.chapters;
  }
}

