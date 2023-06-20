import { create } from "domain";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    otp:number;

    @Column({default: 0})
    loginAttempts: number;

    @Column({default: false})
    islocked: boolean;

    @Column({nullable:true})
    blockTime: Date;

    @Column({default: false})
    isverified: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable:true})
    iscreatedby:number;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable:true})
    isupdatedby: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({nullable:true})
    isdeletedby:number;




    
}


