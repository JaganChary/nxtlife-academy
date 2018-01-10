import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';
import { BASEURL } from '../shared/app.constant';

@Injectable()
export class SubscriptionsService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  getSubscriptions(): any {
    return this.commonHttpService.get('/admin/subscriptions');
  }
}
