import { Component } from '@angular/core';
import { ServiceService } from "../service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private service:ServiceService,private router:Router){}
  email:string='';
  password:string='';

  onSubmit(){
    const signin={
      email:this.email,
      password:this.password
    }
    console.log(signin);
    this.service.login(signin).subscribe((data)=>{
      console.log(data);
      
      
    }
    )


  }
  forgot(){
    this.router.navigate(["forgot_password"])
  }

}
