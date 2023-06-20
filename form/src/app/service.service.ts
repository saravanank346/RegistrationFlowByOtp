import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  signUp(signup:any){
    return this.http.post<any>("http://localhost:3000/user/signup",signup)
  }

  verify(body:any){
    console.log("inside verify service service");
    
    return this.http.put<any>("http://localhost:3000/user/verify",body)


  }
  otp_send(body:any){
    return this.http.post("http://localhost:3000/user/sendOtp",body)
  }

  otp_verify(body:any){
    return this.http.post("http://localhost:3000/user/verifyOtp",body)
  }
  reset(body:any){
    return this.http.post("http://localhost:3000/user/resetPassword",body)
  }

  // forgotPassword(body:any){
  //   return this.http.post<any>("http://localhost:3000/user/forgot",body)
  // }

  login(body:any){
    return this.http.post<any>("http://localhost:3000/user/login",body)
  }
}
