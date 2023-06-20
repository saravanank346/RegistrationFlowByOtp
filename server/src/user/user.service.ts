import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)private user_repository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    await this.user_repository.save(createUserDto)
    
  }

  async getAllByEmail(email:string){
    return await this.user_repository.findOne({where:{email:email},select:["id","name","email","phone","otp","password","isverified","loginAttempts","blockTime"]})
  }

  async updateOtp(id:number,otp:any){
    console.log("id",id);
    console.log("otp",otp);
    
    return await this.user_repository.update(id,otp)
  }

  async updatePass(id:number,pass:any){
    console.log("id",id);
    console.log("pass",pass);
    
    return await this.user_repository.update(id,pass)
  }

  async updateAttempt(id:number,Attempts:number){
    return await this.user_repository.update(id,{loginAttempts:Attempts})
  }

  async updateLoginAttempt(id:number,loginAttempts:any,blockTime:any){
    return await this.update(id,{loginAttempts:loginAttempts,blockTime:blockTime})
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number,isVerified:any) {
    console.log("id",id);
    
    
   return await this.user_repository.update(id,isVerified)
    
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
