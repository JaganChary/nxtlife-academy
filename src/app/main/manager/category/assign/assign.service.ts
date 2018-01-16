import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../shared/commonHttp.service';

@Injectable()
export class AssignService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getAllEmployeeList(): any {
    return this.commonHttpService.get('/manager/employees?role=employee');
  }
}
