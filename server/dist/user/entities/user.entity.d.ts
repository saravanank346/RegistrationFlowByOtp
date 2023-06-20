export declare class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    otp: number;
    loginAttempts: number;
    islocked: boolean;
    blockTime: Date;
    isverified: boolean;
    created_at: Date;
    iscreatedby: number;
    updated_at: Date;
    isupdatedby: number;
    deleted_at: Date;
    isdeletedby: number;
}
