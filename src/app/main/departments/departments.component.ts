import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;

  constructor(
      private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {  
      this.commonHttpService.getDepartments()
      .subscribe((res: any) => {
        this.departments = res.data;
        console.log('All Department: ',res);
      }, (error: any) => {
        console.log('Errrrorrrrr: ', error);
      })
  }

}
