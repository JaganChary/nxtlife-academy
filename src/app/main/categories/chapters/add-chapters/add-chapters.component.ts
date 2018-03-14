import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ChaptersService } from '../chapters.service';
import { CategoriesService } from '../../categories.service';
import { ActivatedRoute } from '@angular/router';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-add-chapters',
  templateUrl: './add-chapters.component.html',
  styleUrls: ['./add-chapters.component.css']
})
export class AddChaptersComponent implements OnInit {
  datas: any;
  file: Array<any> = [];
  courseId: any;
  addChapterForm: FormGroup;
  formData: FormData;

  constructor(
    private formBuilder: FormBuilder,
    private chaptersService: ChaptersService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.initForm();

    this.getCourseId();
  }

  // Array of categories and their information received via sa/categories url

  getCourseId(): any {
    this.courseId = +this.route.snapshot.paramMap.get('id');
  }

  initForm(): any {

    this.addChapterForm = this.formBuilder.group({
      chapter: ['', Validators.required],
      imageFile: [Validators.required],
      topics: this.formBuilder.array([
        this.getTopic()
      ])
    })
  }

  fileUpload(e: any): any {
    let file = e.target.files[0];
    this.addChapterForm.controls['imageFile'].patchValue(file);
  }

  fileUploadTopicImage(e: any, topic): any {
    let file = e.target.files[0];
    topic.controls['imageFile'].patchValue(file);
  }

  getTopic(): any {
    return this.formBuilder.group({
      topic: ['', Validators.required],
      durationString: ['00:00:00', Validators.required],
      imageFile: []
    })
  }

  // Add Topic
  addTopic(): any {
    const topics = <FormArray>this.addChapterForm.controls['topics'];
    topics.push(this.getTopic());
  }

  // Delete Topic  
  deleteTopic(i: number): any {
    const topics = <FormArray>this.addChapterForm.controls['topics'];
    topics.removeAt(i);
  }

  // Post Request  
  btnSubmit(): any {

    if (this.addChapterForm.invalid) {

      return;
    } else {
      
      var formInfo = this.chaptersService.createFormData(this.addChapterForm.value);

      this.chaptersService.postChaptersandTopics(formInfo, this.courseId)
        .subscribe((res: any) => {

          alertify.success(res.message);
          console.log(res);
        }, (err: any) => {

          alertify.alert(err.msg).setHeader('Error Message');
          console.log(err);
        })
    }
  }
}
