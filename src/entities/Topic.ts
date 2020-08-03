import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Max, Min, Length, IsString, IsNumber, IsDate } from "class-validator";
import { statusEntities } from "../types/statusEntities";

@Entity()
export class Topic extends BaseEntity {
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
  @Length(10,6500)
  @IsString()
  content: string;

  @Column()
  @IsDate()
  created_at: Date;

  @Column()
  updated_at: Date;

}
