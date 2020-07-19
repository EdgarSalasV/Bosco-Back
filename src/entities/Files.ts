import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn,OneToMany} from "typeorm";

import {Length} from "class-validator";

enum Status {
    Active = 'active',
    Inactive = 'inactive',
    Suspended = 'suspended',
    Deleted = 'deleted'
}

@Entity()
export class Files {

    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Length(36)

    @Column({
        type: "varchar",
        nullable: false
    })
    url: string;
    @Length(100)
    
    @Column({
        type: 'text',
        nullable: false
    })
    status: Status;

    @Column({
        type: "varchar",
        nullable: false
    })
    type_file: string;
    @Length(5)

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    updatedAt: Date;

    // @OneToMany(type => Files, files => files)
    // files: Files;

}