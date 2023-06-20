import { Component } from '@angular/core';
import { ServiceService } from "../service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  constructor(private service:ServiceService,private route:Router){}
 otp:any=""

  verifyOTP(){
    console.log("inside verify otp");

    
    let email=localStorage.getItem("email")
    console.log(email);
    
   const  payload={
    verify_code:this.otp,
    email:email
    }
    this.service.verify(payload).subscribe((data)=>{
     if (data.message=="Account Verified Successfully") {
      this.route.navigate(["signin"])
     } else {
      console.log("invalid otp");
      
        alert("invalid otp")
      
     }
    }
    )
   
    


  }

}
