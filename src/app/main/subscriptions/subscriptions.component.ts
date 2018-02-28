import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})

export class SubscriptionsComponent {
  subscriptions: any
  
  constructor(
      private subscriptionsService: SubscriptionsService
  ) { }
  
  ngOnInit() {

    // *********** Making call to subscription api  to get data *********** //
    this.subscriptionsService.getSubscriptions()
    .subscribe((res: any) => {
     this.subscriptions = res.data;
     console.log(this.subscriptions);

    }, (error: any) => {
      console.log(error);  
    })
  }
}
