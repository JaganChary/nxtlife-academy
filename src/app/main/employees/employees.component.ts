import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';
import { EmployeesService } from './employees.service';
import { ProgressBarService } from '../shared/progress-bar.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  roleInfos: any;
  employees: any;

  constructor(
    private employeesService: EmployeesService,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit() {
    // Getting all Employees List

    this.progressBarService.startProgressBar();
    this.employeesService.getEmployees()
      .subscribe((res: any) => {

        this.employees = res.data;
        this.progressBarService.endProgressBar();
        console.log(this.employees);
        
      }, (error: any) => {

        this.progressBarService.endProgressBar();   
        console.log(error);
      })

  }
}
