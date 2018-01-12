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

  constructor(
    private categoriesService: CategoriesService
  ) { }
  
    ngOnInit() {

      this.categoriesService.getCategories()
      .subscribe((res: any) => {

         this.categories = res;
         this.storeData = this.categoriesService.storeCategoriesData(res);
         console.log(res);
      
        }, (error: any) => {
          console.log(error);
      }); 
  }
}
