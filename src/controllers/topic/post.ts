import { Request, Response } from "express";
import { Topic } from "../../entities/Topic";
import { currentTimestamp } from "../../utils/momentTimezone";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { catchErrorReponse } from "../../utils/catchError";
import { validate, ValidationError } from "class-validator";
import { loggerLevelEnum } from "../../types/logger";
import { loggerTime } from "../../utils/logger/loggerTime";
import { entityEnum } from "../../types/entities";
import { loggerTimeBody } from "../../types/topic";

export const addTopic = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();
  loggerTimeBody.name = "postTopic()";

  const { title, status, content } = req.body;

  let response: iResponse = { code: 0, message: "", data: [] };

  try {
    let newTopic = new Topic();
    newTopic.title = title;
    newTopic.status = status;
    newTopic.content = content;
    // newTopic.topic_id = topic_id;
    newTopic.created_at = currentTimestamp();
    // newTopic.updated_at = null;

    const errors = await validate(newTopic);

    if (errors.length !== 0) {
      const validations = sendValidations(errors);
      response = { code: 400, message: MessageEnum.warning, data: validations };
      loggerReponse(loggerLevelEnum.warn);
      res.send(response);
      return;
    }

    await Topic.save(newTopic);
    response.code = 201;
    response.message = MessageEnum.added;
  } catch (error) {
    res.send(catchErrorReponse(error, loggerTimeBody));
    return;
  }

  loggerReponse();
  res.send(response);
};

// FUNCTIONS

const sendValidations = (errorList: ValidationError[]) => {
  return errorList.map((error) => ({
    field: error.property,
    message: error.constraints,
  }));
};
const loggerReponse = (level?: loggerLevelEnum) => {
  if (level) loggerTimeBody.level = level;
  loggerTimeBody.name = "addTopic()";
  loggerTimeBody.entity = entityEnum.topic;
  loggerTime.done(loggerTimeBody);
};
