import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import * as e from 'cors';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-forgot-pass-verify',
  templateUrl: './forgot-pass-verify.component.html',
  styleUrls: ['./forgot-pass-verify.component.scss']
})
export class ForgotPassVerifyComponent {
  constructor(private service:ServiceService,private rout:Router){}

  otp:any=""


  verifyOTPForgot(){
   const email= localStorage.getItem("email")
    const payload={
      otp: this.otp,
      email:email
    }
    console.log("payload",payload);
    
    this.service.otp_verify(payload).subscribe((data:any)=>{
      if (data.message=="otp verified successfully") {
        this.rout.navigate(['/reset_password'])
      } else {
        alert("invalid otp")
        
      } 
      
 
    
      
    })

  
 
    

}

}
