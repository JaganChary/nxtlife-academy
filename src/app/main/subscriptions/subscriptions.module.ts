import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsComponent } from './subscriptions.component'
import { Router, RouterModule } from  '@angular/router';

@NgModule({
  declarations: [
    SubscriptionsComponent,
    
  ],

  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscriptionsComponent,
        
      },
      
    ])
  ]
  
})
export class SubscriptionsModule { }
