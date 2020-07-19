import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToOne } from "typeorm";
import {Length,Max, Min} from "class-validator";

import {Status} from "./enumStatus";
import {Comment} from "./Comment";
import {Files} from "./Files";

@Entity()
export class Topic {

    @PrimaryGeneratedColumn()
    id: string | null;
    @Max(36)
    @Min(36)

    @Column()
    title: string | null;
    @Length(70)
    
    @Column()
    status: Status;

    @CreateDateColumn()
    createdAt: Date | null;

    @UpdateDateColumn()
    updatedAt: Date | null;

}