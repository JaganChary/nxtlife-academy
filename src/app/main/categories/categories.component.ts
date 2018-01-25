import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryId: number;
  categories: Array<any>;
  storeData: any;
  role: String

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
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

    this.role = localStorage.getItem('role');


  }

}
