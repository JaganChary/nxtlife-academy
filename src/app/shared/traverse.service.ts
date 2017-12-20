import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class TraverseService {
  response: Array<any>;
  categoriesData: object;

  constructor() { }

  storeCategoriesData(categories: Array<any>) {

    this.categoriesData = {};
    
    categories.forEach((catg:any)=>{
        this.categoriesData[catg.courseCategoryId]=catg;
    });
  }

  getCategoryDataById(id: number) {
    return this.categoriesData[id];
  }
  
}


