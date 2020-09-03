import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    email: string;
    
    @Column()
    username: string;
    
    @Column()
    names: string;
    
    @Column()
    last_names: string;
    
    @Column()
    lada: string;
    
    @Column()
    phone: string;
    
    @Column()
    rfc: string;
    
    @Column()
    password: string;
    
    @Column()
    birthday: string;
    
    @Column()
    country: string;
    
    @Column()
    location: string;

    @Column()
    created_at: Date;

    @Column()
    deleted_at: Date;

}