import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { loggerTime } from "../../utils/logger/loggerTime";
import { Topic } from "../../entities/Topic";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTimeBody } from "../../types/topic";

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


export const getTopic = async (req: Request, res: Response) => {
  loggerTime.startTimer();
  loggerTimeBody.name = "getTopicByID";

  const response: iResponse = {code: 0, message: "", data: {}}
  const {id} = req.params;

  try {
   const topic = new Topic();
   const topicId =  await topic.getTopicByID(id)

    if(Array.isArray(topicId) && topicId.length > 0){
      response.code = 200;
      response.message = MessageEnum.ok;
    response.data = topicId;

    }else{
      response.code = 404;
      response.message = MessageEnum.noMatch;
    }
  } catch (error) {
    res.send(catchErrorReponse(error, loggerTimeBody));
    return;
  }

  loggerTime.done(loggerTimeBody);
  res.send(response);
}