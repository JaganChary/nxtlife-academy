import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from './app.constant';
 
@Injectable()
export class CommonHttpService {
  traverseService: any;
  storeData: any;
  categories: any;
  organizationId: any
  header: any = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  

  constructor(
    private httpClient: HttpClient
  ) { }
  // All departments

  getDepartments():any {
    
    return this.httpClient.get(BASEURL + `/admin/departments`, {
      headers: this.header
    });
  }  

  // All categories 

  getCategories():any {
    return this.httpClient.get(BASEURL + '/categories', {
      headers: this.header
    });
  }
  
  // All Employees

  getEmployees():any {
    return this.httpClient.get(BASEURL + '/admin/employees', {
      headers: this.header
    });
  } 

  // All subscriptions

  getSubscriptions(): any {
    return this.httpClient.get(BASEURL + `/admin/subscriptions`, {
      headers: this.header
    })
  }
  
  // My Courses
  
  getMyCourses(): any {
    return this.httpClient.get(BASEURL + `/admin/my-courses`, {
      headers: this.header
    })
  }

  // Employees List

  getEmployeesList(): any {
    return this.httpClient.get(BASEURL + '/admin/employees?role=employee', {
      headers: this.header
    })
  }

  // Managers List

  getManagersList(): any {
    return this.httpClient.get(BASEURL + '/admin/employees?role=manager', {
      headers: this.header
    })
  }   

  // Manager Task

  getManagerTaskList(): any {
    return this.httpClient.get(BASEURL + '/admin/assign/tasks', {
      headers: this.header
    })
  }
  
}
