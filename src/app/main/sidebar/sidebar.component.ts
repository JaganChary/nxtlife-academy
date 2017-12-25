import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  constructor(
    private commonHttpService: CommonHttpService  
  ) { }

  ngOnInit() {
    
  }

  // Getting all Subscriptions List
  btnSubscriptions() {
    this.commonHttpService.getSubscriptions()
    .subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {

    });
  }

  // Getting all Employees List
  btnEmployees() {
    this.commonHttpService.getCategories()
    .subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);  
    })
  }

  // Getting all  Departments List
  btnDepartments() {
    this.commonHttpService.getDepartments()
    .subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);  
    })
  }

}
