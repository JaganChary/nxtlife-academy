import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any>;
  storeData: any;
  role: String;
  
  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {

    this.categoriesService.getCategories()
      .subscribe((res: any) => {

        this.categories = res;
        this.categoriesService.storeCategoriesData(res);
        
      }, (error: any) => {
        console.log(error);
      });

    this.role = localStorage.getItem('role');
  }

  // Button to edit category

  addCategory(): any {
    this.categoriesService.storeCategoryData({}, 'Add');
  }

  editCategory(category: any): any {
    this.categoriesService.storeCategoryData(category, 'Edit');
  }

}
