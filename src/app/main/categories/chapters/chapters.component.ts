import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CategoriesService } from '../categories.service';
import { ChaptersService } from './chapters.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  topics: any;
  role: string;
  courseData: any;
  chapters: any;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private chaptersService: ChaptersService

  ) { }

  ngOnInit() {

    if (!this.categoriesService.categoriesData) {
      this.fromServer();

    } else {
      this.directly();
    }

    this.role = localStorage.getItem('role');
  }

  fromServer(): any {

    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categoriesService.storeCategoriesData(res);
        const id = +this.route.snapshot.paramMap.get('id');
        this.courseData = this.categoriesService.getCourseDataById(id);
        this.chapters = this.courseData.chapters;
        console.log(this.chapters);
        
      }, (error: any) => {
        console.log(error);

      })
  }

  directly(): any {

    const id = +this.route.snapshot.paramMap.get('id');
    this.courseData = this.categoriesService.getCourseDataById(id);
    this.chapters = this.courseData.chapters;
    console.log(this.chapters);

  }
  
  deleteChapter(chapterId, i): any {

    this.chaptersService.deleteChapter(chapterId)
      .subscribe((res: any) => {

        console.log(res);
        let obj = this.chapters.splice(i, 1);
        console.log(obj);
      }, (err: any) => {

        console.log(err);
      })
  }

// not done yet complete it later
  deleteTopic(topicId, i, j): any {

    this.chaptersService.deleteTopic(topicId)
      .subscribe((res: any) => {

        console.log(res);
        let obj = this.chapters[i].topics.splice(j, 1);
        console.log(obj);
      }, (err: any) => {

        console.log(err);
      })
  }
}

