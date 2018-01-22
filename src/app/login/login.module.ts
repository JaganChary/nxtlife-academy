import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginService } from './login.service';
import { CommonHttpService } from '../main/shared/commonHttp.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  providers: [ LoginService, CommonHttpService ]
})
export class LoginModule{
  constructor(){
    
  }
}