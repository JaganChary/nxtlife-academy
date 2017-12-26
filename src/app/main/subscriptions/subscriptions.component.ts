import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { log } from 'util';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})

export class SubscriptionsComponent {
    subscriptions: any
  constructor(
      private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
    this.commonHttpService.getSubscriptions()
    .subscribe((res: any) => {
     this.subscriptions = res;
     console.log(this.subscriptions);   
    }, (error: any) => {
      console.log(error);  
    })
  }
}
