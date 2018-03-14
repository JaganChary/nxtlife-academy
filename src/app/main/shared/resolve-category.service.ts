import { Injectable } from '@angular/core';
import { ParamMap, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResolveDataService {

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,

  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.paramMap.get('id');
    return this.categoriesService.getCategoryDataById(id)
    .map(cat => {
      if (cat) {
        return cat;
      } else { 
        this.router.navigate(['/main/category']);
        return null;
      }
    });
  }

  
}

