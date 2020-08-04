import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  getRepository,
} from "typeorm";
import { Max, Min, Length, IsString, IsNumber, IsDate } from "class-validator";
import { statusEntities } from "../types/statusEntities";
import { Comment } from "./Comment";

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
  @Length(10, 6500)
  @IsString()
  content: string;

  @Column()
  @IsDate()
  created_at: Date;

  @Column()
  updated_at: Date;

  //TODO test getTopicListTEST VS getTopicList
  // getTopicListTEST = async () => {
  //   const subCommentQuery = getRepository(Comment)
  //     .createQueryBuilder("c")
  //     .select("JSON_ARRAYAGG(c.id) as comment, c.topic_id")
  //     .groupBy("c.topic_id");

  //   let topicLits: any = getRepository(Topic)
  //     .createQueryBuilder("t")
  //     .select("t.*, tc.comment")
  //     .leftJoin(`(${subCommentQuery.getQuery()})`, "tc", "t.id = tc.topic_id");

  //   topicLits = await topicLits.getRawMany();

  //   return topicLits;
  // };

  static getTopicList = async () => {
    const subCommentQuery = getRepository(Comment)
      .createQueryBuilder("c")
      .select("c.id, c.topic_id");

    let topicLits: any = getRepository(Topic)
      .createQueryBuilder("t")
      .select(`t.*, CONCAT('[',GROUP_CONCAT('"',tc.id,'"'),']')  AS Comments`)
      // .select(`t.*, GROUP_CONCAT(tc.id)  AS Comments`)
      .leftJoin(`(${subCommentQuery.getQuery()})`, "tc", "t.id = tc.topic_id")
      .groupBy("t.id, tc.topic_id");

    topicLits = await topicLits.getRawMany();

    return topicLits;
  };

  static getTopicByID = async (id: string) => {
    const subCommentQuery = getRepository(Comment)
      .createQueryBuilder("c")
      .select("c.id, c.topic_id");
      
    let topicID: any = getRepository(Topic)
      .createQueryBuilder("t")
      .select(`t.*, CONCAT('[',GROUP_CONCAT('"',tc.id,'"'),']')  AS Comments`)
      .leftJoin(`(${subCommentQuery.getQuery()})`, "tc", "t.id = tc.topic_id")
      .where(`t.id = '${id}'`)
      .groupBy("t.id, tc.topic_id");
      topicID = await topicID.getRawMany();

    return topicID;
  };
}
