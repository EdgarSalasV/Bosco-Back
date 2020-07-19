import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";

import { Length,Min,Max} from "class-validator";

import { Topic } from "./Topic";
import {Status} from "./enumStatus";


@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: string;
    @Max(36)
    @Min(36)

    @Column()
    title: string | null;
    @Length(70)

    @Column()
    status: Status | null;

    @Column()
    content: string | null;
    @Length(400)

    @Column()
    createdAt: Date | null;

    @Column()
    updatedAt: Date | null;

    // @OneToMany(type => Topic, topic => topic)
    // topic: Topic;

}