import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  roleInfos: any;
  employees: any;
    
  constructor(
      private employeesService: EmployeesService
  ) { }

  ngOnInit() { 
  // Getting all Employees List
  
    this.employeesService.getEmployees()
    .subscribe((res: any) => {
     this.employees = res.data;
     console.log(this.employees);
    }, (error: any) => {
      console.log(error);  
    })
  
   }
}
