import { Component, OnInit } from '@angular/core';
import { AssignService } from './assign.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  courseData: any;

  constructor(
    private route: ActivatedRoute,
    private assignService: AssignService,
    private categoryService: CategoryService
  ) { }

  ngOnInit( ) {

    if(!this.categoryService.coursesData ) {
      this.getCoursesDataFromServer();
      
    } else {
      this.getCoursesDataDirectly();
    }

    this.getList();
  }

  getCoursesDataFromServer(): any {
    this.categoryService.getManagerTasks().
    subscribe((res: any) => {
      this.categoryService.storeCategoryData(res.data);
      const id = +this.route.snapshot.paramMap.get('id');
      this.courseData = this.categoryService.getCourseDataByID(id);
      console.log(this.courseData);

      this.getList();

    }, (err: any) => {
      console.log(err);
    }) 
  }

  getCoursesDataDirectly(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseData = this.categoryService.getCourseDataByID(id);
    console.log(this.courseData); 
  }

  getList(): any {
    this.assignService.getAllEmployeeList()
    .subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }

  

}
