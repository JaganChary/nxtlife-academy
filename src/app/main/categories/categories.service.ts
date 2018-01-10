import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class CategoriesService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getCategories(): any {
    this.commonHttpService.get('/categories');
  }
}
