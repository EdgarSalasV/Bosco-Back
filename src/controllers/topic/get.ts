import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { loggerTime } from "../../utils/logger/loggerTime";
import { Topic } from "../../entities/Topic";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTimeBody } from "../../types/topic";
import { Repository } from "typeorm";

export const getTopics = async (req: Request, res: Response) => {
  //log
  loggerTime.startTimer();
  loggerTimeBody.name = "getTopics()";

  const response: iResponse = { code: 0, message: "", data: [] };

  try {
    const topic = new Topic();
    const topicList = await topic.getTopicList();
    if (Array.isArray(topicList) && topicList.length > 0) {
      response.code = 200;
      response.message = MessageEnum.ok;
      response.data = topicList;
    } else {
      response.code = 400;
      response.message = MessageEnum.noData;
    }
  } catch (error) {
    console.log("error", error);
    res.send(catchErrorReponse(error, loggerTimeBody));
    return;
  }

  loggerTime.done(loggerTimeBody);
  res.send(response);
};
