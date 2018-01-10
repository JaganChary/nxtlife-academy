import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;

  constructor(
      private departmentsService: DepartmentsService
  ) { }

  ngOnInit() {  
      this.departmentsService.getDepartments()
      .subscribe((res: any) => {
        this.departments = res.data;
        console.log('All Department: ',res);
      }, (error: any) => {
        console.log('Errrrorrrrr: ', error);
      })
  }

}
