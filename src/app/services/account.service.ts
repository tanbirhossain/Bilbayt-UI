
import { LoginVM } from './../models/login-vm';
import { RegisterVM } from './../models/register-vm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }
  registration(vm: RegisterVM) {
    const httpOptions = { headers: new HttpHeaders({ 'No-Auth': 'True' }) };
    return this.http.post(baseUrl + `/api/v1/Account/Registration`, vm, httpOptions);
  }


  login(vm: LoginVM) {
    const httpOptions = { headers: new HttpHeaders({ 'No-Auth': 'True' }) };
    return this.http.post(baseUrl + '/api/v1/Account/Login', vm, httpOptions);
  }

   getUserInformation() {
    return this.http.get(baseUrl + '/api/v1/Client/GetUserInfo');
  }

}
