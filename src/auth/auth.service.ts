import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(body:any){
    return this.http.post(`${environment.baseURL}/signup`,body)
  }
  getuserDeatils(id:any){
    return this.http.get(`${environment.baseURL}/user/${ id }`);
  }
  login(body:any){
    return this.http.post(`${environment.baseURL}/login`,body)
  }
  verifyOtp(body:any){
    return this.http.post(`${environment.baseURL}/verify-otp`,body)
  }
  logout(){
    const authToken = localStorage.getItem('authToken')
    return this.http.post(`${environment.baseURL}/logout`,null,{
      headers: { authorization: `${authToken}` }
    });
  }
}
