import { Component, OnInit } from '@angular/core';
import { BASEURL } from '../../../shared/app.constant';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  courses: any;
  categoryData: any;
  chapters: any;
  topics: any;
  
  constructor(
    private router: Router,
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
        this.categoryData = this.traverseService.getCategoryDataById(id);
        console.log('Request sent');
        this.courses = this.categoryData.courses;
        // Chapters

        this.courses.forEach((elements: any) => {
          this.chapters = elements.chapters; 
          
          this.chapters.forEach((elements: any) => {
            this.topics = elements.topics;
          });
          console.log(this.topics[0].topic);
        });
        console.log(this.chapters);


        

      }, (error: any) => {
        console.log(error);

      })
    } else {
        const id = +this.route.snapshot.paramMap.get('id');
        this.categoryData = this.traverseService.getCategoryDataById(id);
        console.log('Request not sent');
        console.log(this.categoryData);
        this.courses = this.categoryData.courses;
        console.log(this.courses);
        
        this.courses.forEach((elements: any) => {
          this.chapters = elements.chapters; 
          
          this.chapters.forEach((elements: any) => {
            this.topics = elements.topics;
          });
          console.log(this.topics);
  
        });
        console.log(this.chapters);

       
    }
  }
}

