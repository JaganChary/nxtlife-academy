import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { ProgressBarService } from '../../shared/progress-bar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any;
  storeData: any;
  constructor(
    private categoryService: CategoryService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    this.progressBarService.startProgressBar();

    this.categoryService.getManagerTasks()
    .subscribe((res: any) => {

      this.progressBarService.endProgressBar();
      this.categories = res.data;
      console.log(this.categories);
      this.storeData = this.categoryService.storeCategoryData(res.data);
      console.log(this.storeData);
      

    }, (err: any) => {
      console.log(err);
    })
  }

  
}
