import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResolveCourseService {

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id');
    console.log(id);
    return this.categoriesService.getCourseDataById(id).map(course => {
      if(course) {
        console.log(course);
        return course;
      } else {
        this.router.navigate(['/main/category']);
        return null;
      }
    })
  }
}
