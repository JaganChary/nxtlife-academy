import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { log } from 'util';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  roleInfos: any;
  employees: any;
    
  constructor(
      private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() { 
  // Getting all Employees List
  
    this.commonHttpService.getEmployees()
    .subscribe((res: any) => {
     this.employees = res;
     console.log(this.employees);
    }, (error: any) => {
      console.log(error);  
    })
  
   }
}
