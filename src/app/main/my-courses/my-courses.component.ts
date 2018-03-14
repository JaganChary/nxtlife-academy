import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyCoursesService } from './my-courses.service';
import { CartValueService } from '../shared/cart-value.service';
import { Router } from '@angular/router';
import { ProgressBarService } from '../shared/progress-bar.service';


@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
    courses: any;
    
    constructor(
        private cartValueService: CartValueService,
        private myCoursesService: MyCoursesService,
        private router: Router,
        private progressBarService: ProgressBarService
    ) { }

    ngOnInit() {

        // All Courses
        this.progressBarService.startProgressBar();
        this.myCoursesService.getMyCourses()
            .subscribe((res: any) => {
                this.courses = res.data;
                this.progressBarService.endProgressBar();
                console.log(res.data);

            }, (err: any) => {
                console.log(err);
            })

    }

    buyNow(course): any {
        this.cartValueService.addCartData(course);
        this.router.navigate(['main/cart'])
    }

}
