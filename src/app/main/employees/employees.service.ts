import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class EmployeesService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getEmployees(): any {
    return this.commonHttpService.get('/admin/employees');
  }

  getRoles(): any {
    return this.commonHttpService.get('/admin/role');
  }

  getDepartments(): any {
    return this.commonHttpService.get('/admin/departments');
  }

  addEmployee(data): any {
    return this.commonHttpService.post('/admin/employee', data);
  }

}
