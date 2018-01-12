import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class DashboardService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  

}
