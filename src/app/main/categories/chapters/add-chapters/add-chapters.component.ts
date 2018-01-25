import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ChaptersService } from '../chapters.service';
import { CategoriesService } from '../../categories.service';
import { ActivatedRoute } from '@angular/router';

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

      chapters: this.formBuilder.array([
        this.getChapter()
      ]),

    })
  }

  fileUpload(imageFile: any, i: number): any {
    this.file[i] = imageFile.target.files[0];
    
    this.datas = this.addChapterForm.value.chapters;
    this.datas.forEach((e: any) => {
      e['imageFile'] = this.file[i]
    })
    
  }

  getChapter(): any {
    return this.formBuilder.group({
      chapter: ['', Validators.required],
      topics: this.formBuilder.array([
        this.getTopic()
      ])
    })
  }

  getTopic(): any {
    return this.formBuilder.group({
      topic: ['', Validators.required],
      duration: ['00:00:00', Validators.required]
    })
  }
  // *********** Chapters *********** //

  // Add Chapter
  addChapter(): any {
    const chapters = <FormArray>this.addChapterForm.controls['chapters'];
    chapters.push(this.getChapter());

  }

  // Delete Chapter  
  deleteChapter(i: number): any {
    const chapters = <FormArray>this.addChapterForm.controls['chapters'];
    var x = chapters.removeAt(i);
    console.log(x);
  }

  // *********** Topics *********** //

  // Add Topic
  addTopic(chapterIndex: number): any {
    const chaptersArray = <FormArray>this.addChapterForm.controls['chapters'];
    const chapterGroup = <FormGroup>chaptersArray.controls[chapterIndex];
    const topicsArray = <FormArray>chapterGroup.controls.topics;
    topicsArray.push(this.getTopic());
  }

  // Delete Topic
  deleteTopic(chapterIndex: number, topicIndex: number): any {
    const chaptersArray = <FormArray>this.addChapterForm.controls['chapters'];
    const chapterGroup = <FormGroup>chaptersArray.controls[chapterIndex];
    const topicsArray = <FormArray>chapterGroup.controls.topics;
    topicsArray.removeAt(topicIndex);
  }

  // Post Request  

  btnSubmit(): any {  
    this.formData = new FormData();
    // this.formData.append('chapters', this.datas);

    console.log(this.datas);
    this.chaptersService.postChaptersandTopics(this.formData, this.courseId)
      .subscribe((res: any) => {
        console.log(res);
      }, (err: any) => {
        console.log(err);
      })


  }
}
