import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class CategoryService {
  categoriesData: object

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getManagerTasks(): any {
    return this.commonHttpService.get('/manager/my-tasks');
  }

  // Store Categories

  storeCategoryData(categories: Array<any>) {
    this.categoriesData = {};

    categories.forEach((elem: any) => {
      this.categoriesData[elem.caurseCategoryId] = elem;
    })
  }

  getCategoryDataByID(id: number) {
    return this.categoriesData[id];
  }
}
