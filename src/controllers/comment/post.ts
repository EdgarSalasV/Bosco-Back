import { Request, Response } from "express";
import { Comment } from "../../entities/Comment";
import { currentTimestamp } from "../../utils/momentTimezone";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { catchErrorReponse } from "../../utils/catchError";
import { validate, ValidationError } from "class-validator";
import {
  loggerLevelEnum,
  loggerMessageEmum,
  iLogger,
} from "../../types/logger";
import { loggerTime } from "../../utils/logger/loggerTime";
import { entityEnum } from "../../types/entities";

const loggerBody: iLogger = {
  level: loggerLevelEnum.info,
  message: loggerMessageEmum.controller,
  entity: entityEnum.comment,
  name: "",
  description: "",
};

export const addComment = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();

  const { title, status, content, topic_id } = req.body;
  let response: iResponse = { code: 0, message: "", data: [] };

  try {
    let newComment = new Comment();
    newComment.title = title;
    newComment.status = status;
    newComment.content = content;
    // newComment.topic_id = topic_id;
    newComment.created_at = currentTimestamp();
    // newComment.updated_at = null;

    const errors = await validate(newComment);

    if (errors.length !== 0) {
      const validations = sendValidations(errors);
      response = { code: 400, message: MessageEnum.warning, data: validations };
      loggerReponse(loggerLevelEnum.warn);
      res.send(response);
      return;
    }

    const statusComment = Comment.create(newComment);
    await Comment.save(statusComment);

    response.code = 201;
    response.message = MessageEnum.added;
  } catch (error) {
    res.send(catchErrorReponse(error, loggerBody));
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
  if(level) loggerBody.level = level;
  loggerBody.name = "addComment()";
  loggerBody.entity = entityEnum.comment;
  loggerTime.done(loggerBody);
};
