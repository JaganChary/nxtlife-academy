import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from "./register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule,HttpModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent
      }
    ])
  ],
})
export class RegisterModule{
  constructor(){
    
  }
}