import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CategoriesService } from '../categories.service';
import { ChaptersService } from './chapters.service';
import { TemplatesService } from './templates/templates.service';
import * as alertify from 'alertifyjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarService } from '../../shared/progress-bar.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  chapterId: number;
  fileT: any;
  image: any;
  addORedit: any;
  topicData: any;
  course: any;
  role: string;
  chapters: any;
  topicForm: FormGroup;
  chapterForm: FormGroup;
  editStr: String;
  chapterImage: any;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private chaptersService: ChaptersService,
    private templatesService: TemplatesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private progressBarService: ProgressBarService

  ) { }

  ngOnInit() {

    this.progressBarService.startProgressBar();

    this.route.data
      .subscribe((res: { cats: any }) => {

        this.progressBarService.endProgressBar();
        this.course = res.cats;
        this.chapters = this.course.chapters;
        console.log(this.course);
      });

    this.role = localStorage.getItem('role');
  }

  // Delete Chapter
  deleteChapter(chapterId, i): any {

    alertify.confirm("Do you wish to delete this chapter",
      () => {

        this.progressBarService.startProgressBar();
        this.chaptersService.deleteChapter(chapterId)
          .subscribe((res: any) => {

            this.progressBarService.endProgressBar();
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

  editChapter(editStr: String, chapterId: number): any {

    this.editStr = editStr;
    this.chapterId = chapterId;
    console.log(this.chapterId, this.editStr);

    this.chapterForm = this.formBuilder.group({

      chapter: ['', Validators.required],

      imageFile: []
    });

    this.chapterImage = this.chapterForm.controls.imageFile.value;
  }

  // Delete Topic
  deleteTopic(topicId, i, j): any {

    alertify.confirm('Do you wish to delete this topic',
      () => {

        this.progressBarService.endProgressBar();
        this.chaptersService.deleteTopic(topicId)
          .subscribe((res: any) => {
            console.log(res);
            const obj = this.chapters[i].topics.splice(j, 1);
            alertify.success('Topic Deleted');
          }, (err: any) => {
            alertify.alert(err.msg).setHeader('Message');
            console.log(err);
          });
      },
      () => {
        alertify.error('Cancel');
      }).setHeader('Confirmation');
  }

  // Edit Topic
  editTopic(topicData: any, addORedit: String): any {
    this.topicData = topicData;
    this.addORedit = addORedit;

    this.topicForm = this.formBuilder.group({

      topic: [this.topicData.topic, Validators.required],

      durationString: [this.topicData.duration, Validators.required],

      imageFile: [this.topicData.imageUrl]

    });

    this.image = this.topicForm.controls.imageFile.value;

  }

  // Add Topic
  addTopic(addORedit: String, chapterId: number): any {
    this.addORedit = addORedit;
    this.chapterId = chapterId;

    this.topicForm = this.formBuilder.group({

      topic: ['', Validators.required],

      durationString: ['00:00:00', Validators.required],

      imageFile: ['']

    });
  }

  fileUpload(e: any): any {

    if (!e.target.files[0]) {

      return;
    } else {

      this.fileT = e.target.files[0];
      console.log(this.fileT);

      // this.topicForm.controls['imageFile'].patchValue(this.fileT);

      if (e.target.files || e.target.files[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (e: any) => {
          this.image = e.target.result;
        };
      }
    }
  }

  getTopicData(topicId: number): any {
    this.chaptersService.storeTopicId(topicId);
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      this.router.navigate([`/${topicId}/add-page`]);
    } else {
      return;
    }
  }

  getTopic(topic: any): any {
    this.chaptersService.storeTopic(topic);
    console.log(topic);
  }

  btnSubmit(): any {
    this.progressBarService.startProgressBar();

    const formData = new FormData();

    formData.append('chapter', this.chapterForm.value.chapter);
    formData.append('imageFile', this.fileT);

    this.chaptersService.editChapter(this.chapterId, formData)
      .subscribe((res: any) => {

        this.progressBarService.endProgressBar();
        console.log(res);
      }, (err: any) => {
        console.log(err);
      })
  }


  onSubmit(): any {

    this.progressBarService.startProgressBar();
    let formData = new FormData();

    formData.append('topic', this.topicForm.value.topic);
    formData.append('durationString', this.topicForm.value.durationString);
    formData.append('imageFile', this.fileT);

    console.log(this.topicForm.value.imageFile);

    if (this.addORedit == 'Edit') {
      // this.chaptersService.updateTopic(this.topicData.topicId, formData)
      //   .subscribe((res: any) => {
      // this.progressBarService.endProgressBar();

      //     console.log(res);
      //     alertify.success(res.message);
      let element = this.chapters.forEach((elem: any) => {
        elem = elem.topics
        let topic = elem.find(a => a.topicId == this.topicData.topicId)
        console.log(topic);
      }

      );

      // }, (err: any) => {
      //   alertify.alert(err.msg).setHeader('Message');
      //   console.log(err);
      // })
    } else {
      this.chaptersService.addTopic(formData, this.chapterId)
        .subscribe((res: any) => {

          this.progressBarService.endProgressBar();
          console.log(res);
          alertify.success(res.message);

          let element = this.chapters.find(elem => elem.chapterId == this.chapterId);
          element.topics.push(res.data);

        }, (err: any) => {
          alertify.alert(err.msg).setHeader('Message');
          console.log(err);
        })
    }
  }
}

