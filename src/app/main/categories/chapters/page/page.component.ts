import { Component, OnInit } from '@angular/core';
import { ChaptersService } from '../chapters.service';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../../shared/progress-bar.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  role: string;
  topicId: number;
  template: String;
  recordId: number;
  topic: any;

  constructor(
    private chaptersService: ChaptersService,
    private router: Router,
    private progressBarService: ProgressBarService

  ) { }

  ngOnInit() {


    this.topic = this.chaptersService.getTopic();
    console.log(this.topic);
    // console.log('dffffffffff');

    if (this.topic) {
      this.topicId = this.topic.topicId;
      if (this.topic.pages.length > 0) {
        this.recordId = this.topic.pages[0].record;
        this.template = this.topic.pages[0].template;
        console.log(`TopicId: ${this.topicId}  RecordId: ${this.recordId} Template: ${this.template}`);
      }
      
    } else {
      this.router.navigate(['/main/category']);

    }

    this.getRecordData();

    this.role = localStorage.getItem('role');

  }

  getRecordData(): any {
    if (this.recordId) {
      this.chaptersService.getRecord(this.topicId, this.template, this.recordId)
        .subscribe((res: any) => {

          // this.progressBarService.endProgressBar();
          console.log(res);
        }, (err: any) => {
          console.log(err);
        });
    } else {
      console.log('No pages to display');
    }
  }

  addPage(): any {
    if (this.topicId) {
      this.chaptersService.storeTopicId(this.topicId);
    }
  }

}
