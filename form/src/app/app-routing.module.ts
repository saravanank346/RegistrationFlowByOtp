import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyComponent } from "./verify/verify.component";
import { SigninComponent } from "./signin/signin.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPassVerifyComponent } from './forgot-pass-verify/forgot-pass-verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:"signup",component:SignUpComponent
  },
  {
    path:"signin",component:SigninComponent
  },
  {
    path:"verify_otp",component:VerifyComponent
  },
  {
    path:"forgot_password",component:ForgotPasswordComponent
  },
  {
    path:"otp",component:ForgotPassVerifyComponent
    
  },
  {
    path:"reset_password",component:ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
