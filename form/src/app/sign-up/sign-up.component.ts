import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private service:ServiceService,private router:Router){

  }
  name:string='';
  email:string='';
  phone:string='';
  password:string=""



  submitForm(){
  const signup:any= {
      name:this.name,
      email:this.email,
      phone:this.phone,
      password:this.password,
    }
    console.log(signup);

    localStorage.setItem("email",this.email)
  
    this.service.signUp(signup).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["verify_otp"])
    }
    )

    

  }


}
