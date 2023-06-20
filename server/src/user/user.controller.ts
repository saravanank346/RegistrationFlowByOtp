import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import e, { Response ,Request} from 'express';
import * as nodemailer from "nodemailer"
import { hash,compare, compareSync } from 'bcrypt';
import { ok } from 'assert';




@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  async create(@Body() createUserDto: CreateUserDto,@Req() req:Request,@Res() res:Response,) {
    try {
      const getAllbyMail= await this.userService.getAllByEmail(createUserDto.email)
      if (getAllbyMail) {
        if (getAllbyMail.isverified==true) {
          console.log("User Already Verified...");
          
        } else {
          const Generate_otp=(Math.floor(100000 +Math.random()*90000));
          console.log(Generate_otp);
          await this.sendMail(Generate_otp)
          res.status(HttpStatus.OK).json({
            "message":"verification code sent mail...."
          })
          
        }
        
      } else {
          const hash_password= await hash(createUserDto.password,10)
          console.log(hash_password);
          const generate_otp:any=(Math.floor(100000+Math.random()*90000))
          console.log(generate_otp);
          createUserDto.password=hash_password;
          createUserDto.otp=generate_otp;
          await this.userService.create(createUserDto)
           this.sendMail(generate_otp)
          res.json({
            "message":"verification code sent mail...."
          })
        }
  
    } catch (error) {
         res.status(HttpStatus.BAD_REQUEST).json({message:error.message||"Something Went Wrong in}..."})
      
      }

    
  }

  @Put("verify")
  async update(@Body() body:any,@Res() res:Response ,@Req( ) req:Response){
    try {
      console.log("body",body)
      const body_otp=body.verify_code
      const getAllByMail=await this.userService.getAllByEmail(body.email)
      console.log(getAllByMail);
      console.log("bodyotp",body.verify_code);
      console.log("getbymailotp",getAllByMail.otp);
      
      
     if((getAllByMail.otp)==parseInt(body_otp)) {
        console.log("inside",body_otp);
        
         await this.userService.update(getAllByMail.id,{isverified:true});
      //  return res.json({
      //     message:"Account Verified Successfully..."
      //   })
      return res.status(HttpStatus.OK).json({
        message:"Account Verified Successfully"
      })
        
      } 
      else {
        res.json({
          message:"Invalid OTP..."
        })
        
      }
     
      
      
    } catch (error) {
      res.json({
        message:"account not verified...."
      })
      
    }
    
  }

  @Post("login")
  async login(@Body() body:any,@Res() res:Response,@Req() req:Response){
    const {email , password} = body;
    console.log("body",body);
    try {

      const user:any =await this.userService.getAllByEmail(email)
      console.log("results",user);

      if (user && user.isverified==true) {
        console.log("inside login");
        
        if (user.loginAttempts<3) {
          console.log("inside attempt");
          const compared = compareSync(password,user.password)
          console.log(compared);
          
            if ( compared){
              console.log("inside compared");
               this.userService.updateAttempt(user.id,0)
        
              console.log(user.password);
            
             res.status(HttpStatus.OK).json({
                message:"login successfull",
                data:user
              })
            
            }else{
              const date_now= new Date()
              console.log("date",date_now);
              // const getMinutes= date_now.getMinutes()
              // console.log("min",getMinutes);
              console.log("ids",user.id);
              console.log("loginAttempt",user.loginAttempts)
              const AttemptCount=user.loginAttempts
              await this.userService.updateLoginAttempt(user.id,AttemptCount+1,date_now)
              return res.json({
                message:"Invalid Password..."
              })
            }
          
        } else {
          const date_now= Date.now()
          console.log("date",date_now);
          const time=1*20*1000
          console.log("time",time);
          if (date_now-time>user.blockTime) {
            await this.userService.updateAttempt(user.id,0)
            
          } else {
            res.status(HttpStatus.BAD_REQUEST).json({
              message:"Your Account is Locked ,Please wait for 1 minutes..."
            })
            
          }

          
        }
       

      }else{
        res.json({
          message:"You Didnot have Account Please Signup..."
        })
      }

    } catch (error) {
      res.json({
        message:error.message||"Something Went Wrong..."
      })
      
      
      
    }
  }

  @Post("sendOtp")
  async send_Otp(@Body() body:any,@Req() req:Request,@Res() res:Response){
    
    try {
   
      const email=body.email
      console.log(email);
      const getAllByMail=await this.userService.getAllByEmail(email)
      console.log(getAllByMail);

      const generate_otp:any=(Math.floor(100000+Math.random()*90000))
        console.log(generate_otp);
        await this.sendMail(generate_otp)

        await this.userService.updateOtp(getAllByMail.id,{otp:generate_otp})
        
        res.status(HttpStatus.OK).json({
          message:"otp sent to mail...."
        })


        
    
      
    } catch (error) {
      res.json({
        message:"Something Went Wrong..."
      })
      
    }
  
   
    
     
        
   
    

  }

  @Post("verifyOtp")
  async verify_Otp(@Body() body:any,@Req() req:Request,@Res() res:Response){
    try {
      const email=body.email
      const otp=body.otp
      const getAllByEmail=await this.userService.getAllByEmail(email)
      console.log(getAllByEmail);
      if (getAllByEmail.otp==otp) {
        return res.status(HttpStatus.OK).json({
          message:"otp verified successfully"
        })
        
      } else {
        res.json({
          message:"invalid otp..."
        })
        
        
      } 
      
     
      
      
    } catch (error) {
      res.json({
        message:"Something Went Wrong..."
      })
      
      
    }
  }

  @Post("resetPassword")
  async reset_Password(@Body() body:any,@Req() req:Request,@Res() res:Response){
    try {
      console.log(body);
      const pass=body.newPassword
      console.log(pass);
      console.log("resetPassword");
      const hash_password= await hash(pass,10)
      console.log(hash_password);
      const email=body.email
      const getAllByEmail=await this.userService.getAllByEmail(email)
      console.log("inside reset pass",getAllByEmail);
      await this.userService.updatePass(getAllByEmail.id,{password:hash_password})
      
      res.status(HttpStatus.OK).json({
        message:"password reset successfully"
      })
    } catch (error) {
      res.json({
        message:"Something Went Wrong..."
      })
      
    }
  }
 
// 

  @Get("getall")
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // for send mail................

  sendMail(otp:any){
    const transpoter = nodemailer.createTransport({ 
      host:"sandbox.smtp.mailtrap.io",
      port:2525,
      auth:{
          user:"b64a22a6852062",
          pass:"f231a26b936636"
      }
  
  
  });

  var mailOptions = {
    from: "k12564290@gmail.com",
    to: "k12564290@gmail.com",
    subject: "hii ragul",
    html: "Verify Code :"+otp
        
   
    
    };

    transpoter.sendMail(mailOptions,function (error,results) {
      if(error){
          console.log(error);
      }else{
          console.log("Email sent: "+results.response);
      }
  });


  

  }
}





function Compare(password: string, password1: any) {
  throw new Error('Function not implemented.');
}

