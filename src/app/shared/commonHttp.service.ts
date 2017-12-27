import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from './app.constant';
import { TraverseService } from './traverse.service';
 
@Injectable()
export class CommonHttpService {
  traverseService: any;
  storeData: any;
  categories: any;
  organizationId: any
    

  constructor(
    private httpClient: HttpClient
  ) { }

  // All departments

  getDepartments():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + `/admin/departments`, {
      headers: header
    });
  }  

  // All categories 

  getCategories():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + '/categories', {
      headers: header
    });
  }
  
  // All Employees

  getEmployees():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + '/admin/employees', {
      headers: header
    });
  } 

  // All subscriptions

  getSubscriptions(): any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    
    return this.httpClient.get(BASEURL + `/admin/subscriptions`, {
      headers: header
    })
  }
  
  // Posting Subscription
  
  postSubscription(): any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    return this.httpClient.post(BASEURL + `/admin/subscriptions`, {
      headers: header
    })
  }
}
