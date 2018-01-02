import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { BASEURL } from '../shared/app.constant';
import { CommonHttpService } from '../shared/commonHttp.service';
import { TraverseService } from '../shared/traverse.service';
import { CartValueService } from '../shared/cart-value.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartValue: number = 0;
  cartData: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private commonHttpService: CommonHttpService,
    private traverseService: TraverseService,
    private cartValueService: CartValueService
  ) { }

  ngOnInit() {
    this.cartData = this.cartValueService.cartObservable
    .subscribe((cartValue: number) => {
      this.cartValue = cartValue;
      console.log('Cart Value: ',this.cartValue);
      })
    
  }

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
