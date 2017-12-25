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

  getDepartments():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + '/departments', {
      headers: header
    });
  }  

  getCategories():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + '/categories', {
      headers: header
    });
  } 

  getSubscriptions(): any {
    let organizationId = localStorage.getItem('organizationId');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    // Getting Subscriptions
    return this.httpClient.get(BASEURL + `/admin/organization/${organizationId}/subscriptions`, {
      headers: header
    })
  }

  postSubscription(): any {
    let organizationId = localStorage.getItem('organizationId');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    // Posting Subscription
    return this.httpClient.post(BASEURL + `/admin/organization/${organizationId}/subscriptions`, {
      headers: header
    })
  }
}
