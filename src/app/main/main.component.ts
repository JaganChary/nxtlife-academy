import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { BASEURL } from '../shared/app.constant';
import { CommonHttpService } from '../shared/commonHttp.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private commonHttpService: CommonHttpService
  ) { }

  ngOnInit() {
  }

  // Getting all Subscriptions List
  btnSubscriptions() {
    this.commonHttpService.getSubscriptions()
    .subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {

    });
  }

  

  // // Getting all  Departments List
  // btnDepartments() {
  //   this.commonHttpService.getDepartments()
  //   .subscribe((res: any) => {
  //     console.log(res);
  //   }, (error: any) => {
  //     console.log(error);  
  //   })
  // }


  // Logout
  onLogOut() {
    let header = new HttpHeaders().set('Authorization', "Bearer " + localStorage.getItem('access_token'));
    this.httpClient.get(BASEURL + '/admin/logout', {headers: header})
    .subscribe((res: any) => {
     
      // Clearing Access Token
      localStorage.clear();
      console.log('Access Token cleared and logged Out');
      this.router.navigate(['login']);
    
    }, (error: any) => {
      console.log(error);
    });   
  }
}
