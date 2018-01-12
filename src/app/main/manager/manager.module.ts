import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { ManagerService } from './manager.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ManagerComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagerComponent
      }
    ])
  ],
  providers: [ManagerService]
  
})
export class ManagerModule { }
