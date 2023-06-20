import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private service:ServiceService){}
  newPassword:any=""

  resetPassword(){
   const email= localStorage.getItem("email")
    const payload={
      newPassword:this.newPassword,
      email:email
    }
    console.log(payload);

    this.service.reset(payload).subscribe((data)=>{
      console.log(data);
      
    })
    

  }

}
