import { Injectable } from '@angular/core';
import { CommonHttpService } from './shared/commonHttp.service';

@Injectable()
export class MainService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  onLogout(): any {
    return this.commonHttpService.get('/admin/logout');
  }
}
