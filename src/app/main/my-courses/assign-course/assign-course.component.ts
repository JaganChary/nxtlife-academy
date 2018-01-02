import { Component, OnInit } from '@angular/core';
import { TraverseService } from '../../../shared/traverse.service';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  categoryData: any;
  courses: any;

  constructor(
    
  ) { }

  ngOnInit() {
    
  }
}
