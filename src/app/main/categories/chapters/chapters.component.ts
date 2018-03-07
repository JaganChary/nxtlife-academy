import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { CategoriesService } from '../categories.service';
import { ChaptersService } from './chapters.service';
import { TemplatesService } from './templates/templates.service';
import alertify from 'alertifyjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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


  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private chaptersService: ChaptersService,
    private templatesService: TemplatesService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((res: { cats: any }) => {
        this.course = res.cats;
        this.chapters = this.course.chapters;
      });

    this.role = localStorage.getItem('role');
  }

  // Delete Chapter
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

  // Delete Topic 
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

  // Edit Topic
  editTopic(topicData: any, addORedit: String): any {
    this.topicData = topicData;
    this.addORedit = addORedit;

    this.topicForm = this.formBuilder.group({

      topic: [this.topicData.topic, Validators.required],

      durationString: [this.topicData.duration, Validators.required],

      imageFile: [this.topicData.imageUrl]

    })

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

    })
  }

  fileUpload(e: any): any {

    this.fileT = e.target.files[0];
    console.log(this.fileT);

    // this.topicForm.controls['imageFile'].patchValue(this.fileT);

    if (e.target.files || e.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (e: any) => {
        this.image = e.target.result;
      }
    }
  }

  getTopicData(topicId: number): any {
    this.chaptersService.storeTopicId(topicId);
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      this.router.navigate([`/${topicId}/add-page`]);
    } else {
      return;
    }
  }

  onSubmit(): any {
    let formData = new FormData();

    formData.append('topic', this.topicForm.value.topic);
    formData.append('durationString', this.topicForm.value.durationString);
    formData.append('imageFile', this.fileT);

    console.log(this.topicForm.value.imageFile);

    if (this.addORedit == 'Edit') {
      this.chaptersService.updateTopic(this.topicData.topicId, formData)
        .subscribe((res: any) => {
          console.log(res);
        }, (err: any) => {
          console.log(err);
        })
    } else {
      this.chaptersService.addTopic(formData, this.chapterId)
        .subscribe((res: any) => {
          console.log(res);
        }, (err: any) => {
          console.log(err);
        })
    }
  }
}

