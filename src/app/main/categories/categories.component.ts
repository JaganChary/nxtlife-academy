import { Component, OnInit } from '@angular/core';
import { TraverseService } from '../shared/traverse.service';
import { CommonHttpService } from '../shared/commonHttp.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any>;
  id: number;
  storeData: any;

  constructor(
    private traverseService: TraverseService,
    private commonHttpService: CommonHttpService
  ) { }
  
    ngOnInit() {
      this.commonHttpService.getCategories()
      .subscribe((res: any) => {
         this.categories = res;
         this.storeData = this.traverseService.storeCategoriesData(res);
      }, (error: any) => {
 
      }); 
  }
  
}
