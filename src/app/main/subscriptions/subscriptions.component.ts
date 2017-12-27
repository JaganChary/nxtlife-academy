import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';
import { log } from 'util';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})

export class SubscriptionsComponent {
  stringStartDate: string;
  stringEndDate: string;
  endDate: any;
  subscriptions: any
  
  constructor(
      private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
    this.commonHttpService.getSubscriptions()
    .subscribe((res: any) => {
     this.subscriptions = res;
     console.log(this.subscriptions);

     // Converting End Date into string 
     this.subscriptions.forEach((element: any) => {
       let endDate = element.endDate;
       let startDate = element.startDate;
      
      this.stringEndDate = `${endDate[2]}/${endDate[1]}/${endDate[0]}`;
      this.stringStartDate = `${startDate[2]}/${startDate[1]}/${startDate[0]}`;
      
    });
 
     console.log('SubscribedCourses: ',this.subscriptions[0].subscribedCourses);
     
    }, (error: any) => {
      console.log(error);  
    })
  }
}
