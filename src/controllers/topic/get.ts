import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { loggerTime } from "../../utils/logger/loggerTime";
import { entityEnum } from "../../types/entities";
import { loggerLevelEnum, loggerTypeEmum } from "../../types/logger";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { Topic } from "../../entities/Topic";
import { Comment } from "../../entities/Comment";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTimeBody } from "../../types/topic";

export const getTopics = async (req: Request, res: Response) => {
  //log
  loggerTime.startTimer();

  const response: iResponse = { code: 0, message: "", data: [] };

  try {
    //SELECT cc.comment, t.*
    // FROM topic t
    // INNER JOIN (
    // 	SELECT JSON_ARRAYAGG(c.id) AS comment, c.topic_id
    // 	FROM comment c
    // 	GROUP BY c.topic_id
    // ) cc ON cc.topic_id = t.id
    let topicLits: any = getRepository(Comment)
      .createQueryBuilder("c")
      .innerJoin(Topic, "t", "c.topic_id = t.id");

    topicLits = await topicLits.getRawMany();
  } catch (error) {
    res.send(catchErrorReponse(error, loggerTimeBody));
  }

  loggerTime.done(loggerTimeBody);
  res.send(response);
};
