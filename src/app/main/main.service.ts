import { Injectable } from '@angular/core';
import { CommonHttpService } from './shared/commonHttp.service';

@Injectable()
export class MainService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }
  
  logoutUser():any {
    var user = localStorage.getItem('role');
    if(user == 'admin') {
      return this.commonHttpService.get('/admin/logout');
      
    } else if(user == 'manager') {
      return this.commonHttpService.get('/manager/logout');

    } else if(user == 'sa') {
      return this.commonHttpService.get('/sa/logout');
    }
  }
}
