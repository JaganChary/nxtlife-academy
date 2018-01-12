import { Injectable } from '@angular/core';
import { CommonHttpService } from '../main/shared/commonHttp.service';

@Injectable()
export class LoginService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  onLogin(data): any {
    return this.commonHttpService.postForLogin('/login', data);
  }

  loginStorage(res): any {
    localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('refresh_token', res.data.refresh_token);
    
    // User Details 

    localStorage.setItem('organization', res.data.userDetails.organization);
    localStorage.setItem('organizationId', res.data.userDetails.organizationId);
    localStorage.setItem('fullname', res.data.userDetails.fullName);
    localStorage.setItem('email', res.data.userDetails.email);
    localStorage.setItem('gender', res.data.userDetails.gender);
    localStorage.setItem('id', res.data.userDetails.id);
    
    var roleInfo = res.data.userDetails.roleInfo[0];
    // console.log(roleInfo);  
    // UserDetails --> RoleInfo

    localStorage.setItem('department', roleInfo.department);
    localStorage.setItem('departmentId', roleInfo.departmentId);
    localStorage.setItem('role', roleInfo.role);
    localStorage.setItem('roleId', roleInfo.roleId);
      
  }
}
