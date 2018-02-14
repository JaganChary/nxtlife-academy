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
  course: any;
  role: string;
  chapters: any;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private chaptersService: ChaptersService

  ) { }

  ngOnInit() {

    this.route.data
    .subscribe((res: {cats: any}) => {
      this.course = res.cats;
      this.chapters = this.course.chapters;  
    })

    this.role = localStorage.getItem('role');
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

// not done yet complete later
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

