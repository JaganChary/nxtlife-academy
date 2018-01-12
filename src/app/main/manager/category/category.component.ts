import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any;
  storeData: any;
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    this.categoryService.getManagerTasks()
    .subscribe((res: any) => {
      this.categories = res;
      this.storeData = this.categoryService.storeCategoryData(res);

      console.log(res);

    }, (err: any) => {
      console.log(err);
    })
  }

  
}
