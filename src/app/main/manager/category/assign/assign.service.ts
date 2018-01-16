import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../shared/commonHttp.service';
import { debug } from 'util';

@Injectable()
export class AssignService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getAllEmployeeList(): any {
    return this.commonHttpService.get('/manager/employees?role=employee');
  }

  postEmployeeDetail(data): any {
    return this.commonHttpService.post('/manager/assign/course', data);
  }
}
