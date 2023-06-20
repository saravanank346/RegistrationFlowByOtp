import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private user_repository;
    constructor(user_repository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<void>;
    getAllByEmail(email: string): Promise<User>;
    updateOtp(id: number, otp: any): Promise<import("typeorm").UpdateResult>;
    updatePass(id: number, pass: any): Promise<import("typeorm").UpdateResult>;
    updateAttempt(id: number, Attempts: number): Promise<import("typeorm").UpdateResult>;
    updateLoginAttempt(id: number, loginAttempts: any, blockTime: any): Promise<import("typeorm").UpdateResult>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, isVerified: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
