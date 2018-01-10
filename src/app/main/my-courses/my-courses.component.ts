import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyCoursesService } from './my-courses.service';


@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
    courses: any;
    
    constructor(
        private myCoursesService: MyCoursesService,
    ) { }

    ngOnInit() {

        // All Courses

        this.myCoursesService.getMyCourses()
            .subscribe((res: any) => {
                this.courses = res.data;
                console.log(res.data);

            }, (err: any) => {
                console.log(err);
            })

    }

}
