import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { BASEURL } from '../shared/app.constant';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }
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
