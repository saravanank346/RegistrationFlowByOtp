import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private service:ServiceService,private rout:Router){}
  email:string=""

  submitForm(){
    localStorage.setItem("email",this.email)
    const payload={
      email: this.email
    }
    console.log("payload",payload);
    
    this.service.otp_send(payload).subscribe((data)=>{
      console.log("data",data);
      this.rout.navigate(['/otp'])
      
    })

  }

}
