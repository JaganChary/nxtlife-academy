import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
  }
  btnClick() {
    this.commonHttpService.postSubscription()
    .subscribe((res: any) => {
      console.log('New subscription: ', res);
    },(error: any) => {
      console.log(error);
    })
  }
}
