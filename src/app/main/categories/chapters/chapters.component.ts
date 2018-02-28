import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CategoriesService } from '../categories.service';
import { ChaptersService } from './chapters.service';
import { TemplatesService } from './templates/templates.service';
import alertify from 'alertifyjs';

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
    private chaptersService: ChaptersService,
    private templatesService: TemplatesService,
    private router: Router

  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((res: { cats: any }) => {
        this.course = res.cats;
        this.chapters = this.course.chapters;
      })

    this.role = localStorage.getItem('role');
  }

  deleteChapter(chapterId, i): any {

    alertify.confirm("Do you wish to delete this chapter",
      () => {
        this.chaptersService.deleteChapter(chapterId)
          .subscribe((res: any) => {

            console.log(res);
            let obj = this.chapters.splice(i, 1);
            alertify.success('Chapter Deleted');
            console.log(obj);
          }, (err: any) => {
            alertify.alert(err.msg).setHeader('Message');
            console.log(err);
          })
      },
      () => {
        alertify.error('Cancel');
      }).setHeader('Confirmation');


  }

  deleteTopic(topicId, i, j): any {

    alertify.confirm("Do you wish to delete this topic",
      () => {
        this.chaptersService.deleteTopic(topicId)
          .subscribe((res: any) => {

            console.log(res);
            let obj = this.chapters[i].topics.splice(j, 1);
            alertify.success('Topic Deleted');
          }, (err: any) => {
            alertify.alert(err.msg).setHeader('Message');
            console.log(err);
          })
      },
      () => {
        alertify.error('Cancel');
      }).setHeader('Confirmation');
  }

  getTopicData(topicId: number): any {
    this.chaptersService.storeTopicId(topicId);
    let role = localStorage.getItem('role');
    if(role == 'admin') {
      this.router.navigate([`/${topicId}/add-page`]);
    } else {
      return;
    }
  }
}

