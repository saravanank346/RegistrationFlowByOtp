import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import e, { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, req: Request, res: Response): Promise<void>;
    update(body: any, res: Response, req: Response): Promise<e.Response<any, Record<string, any>>>;
    login(body: any, res: Response, req: Response): Promise<e.Response<any, Record<string, any>>>;
    send_Otp(body: any, req: Request, res: Response): Promise<void>;
    verify_Otp(body: any, req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
    reset_Password(body: any, req: Request, res: Response): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
    sendMail(otp: any): void;
}
