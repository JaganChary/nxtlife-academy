import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyCoursesService } from './my-courses.service';
import { CartValueService } from '../shared/cart-value.service';
import { Router } from '@angular/router';


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
        private router: Router
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

    buyNow(course): any {
        this.cartValueService.addCartData(course);
        this.router.navigate(['main/cart'])
    }

}
