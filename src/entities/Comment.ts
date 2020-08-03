import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  getRepository,
} from "typeorm";
import { Max, Min, Length, IsString, IsNumber, IsDate } from "class-validator";
import { statusEntities } from "../types/statusEntities";
import { Topic } from "./Topic";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  @IsString()
  title: string;

  @Column()
  @Max(4)
  @Min(1)
  @IsNumber()
  status: statusEntities;

  @Column()
  @Length(10, 400)
  @IsString()
  content: string;

  @ManyToOne((type) => Topic)
  @JoinColumn({ name: "topic_id", referencedColumnName: "id" })
  topic_id: Topic;

  @Column()
  @IsDate()
  created_at: Date;

  @Column()
  updated_at: Date;
}
