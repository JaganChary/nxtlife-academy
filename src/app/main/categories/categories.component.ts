import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { ProgressBarService } from '../shared/progress-bar.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any>;
  storeData: any;
  role: string;

  constructor(
    private categoriesService: CategoriesService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.progressBarService.startProgressBar();
    if (this.role === 'admin') {

      this.categoriesService.getCategories()
        .subscribe((res: any) => {

          this.progressBarService.endProgressBar();
          this.categories = res;
          this.categoriesService.storeCategoriesData(this.categories);
          console.log(res);
        }, (err: any) => {
          console.log(err);
        });

    } else if (this.role === 'sa') {
      this.categoriesService.getSaCategories()
        .subscribe((res: any) => {

          this.progressBarService.endProgressBar();
          this.categories = res.data;
          this.categoriesService.storeCategoriesData(this.categories);
          console.log(this.categories);

        }, (error: any) => {
          console.log(error);
        });
    }

  }

  // Button to edit category

  addCategory(): any {
    this.categoriesService.storeCategoryData({}, 'Add');
  }

  editCategory(category: any): any {
    this.categoriesService.storeCategoryData(category, 'Edit');
  }

}
