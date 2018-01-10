import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class DepartmentsService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getDepartments(): any {
    return this.commonHttpService.get('/admin/departments');
  }
}
