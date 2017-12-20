import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from './app.constant';
import { TraverseService } from './traverse.service';
 
@Injectable()
export class CommonHttpService {
  traverseService: any;
  storeData: any;
  categories: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories():any {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.httpClient.get(BASEURL + '/categories', {
      headers: header
    });
  } 
}
