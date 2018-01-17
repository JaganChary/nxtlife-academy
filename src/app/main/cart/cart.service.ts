import { Injectable } from '@angular/core';
import { CommonHttpService } from '../shared/commonHttp.service';

@Injectable()
export class CartService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  postCartItems(data): any {
    return this.commonHttpService.post('/admin/subscription', data);
  }
}
