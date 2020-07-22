import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Max, Min, Length, IsString, IsNumber, IsDate } from "class-validator";
import { Status } from "../types/status";

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
  status: Status;

  @Column()
  @Max(400)
  @IsString()
  content: string;

  @Column()
  @IsDate()
  created_at: Date;

  @Column()
  @IsDate()
  updated_at?: Date;

}
