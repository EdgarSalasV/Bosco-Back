import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { catchErrorReponse } from "../../utils/catchError";
import { currentTimestamp } from "../../utils/momentTimezone";
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
  message: loggerMessageEmum.method,
  entity: entityEnum.comment,
  name: "",
  description: "",
};

export const editComment = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();

  let response: iResponse = { code: 0, message: "", data: {} };
  const { title, status, content, created_at } = req.body;
  const { id } = req.params;

  try {
    let updateComment = new Comment();
    updateComment.title = title;
    updateComment.status = status;
    updateComment.content = content;
    updateComment.created_at = new Date(created_at);
    updateComment.updated_at = currentTimestamp();

    const errors = await validate(updateComment);

    if (errors.length !== 0) {
      const validations = sendValidations(errors);
      response = { code: 400, message: MessageEnum.warning, data: validations };
      loggerBody.level = loggerLevelEnum.warn;
      loggerTime.done(loggerBody);
      res.send(response);
      return;
    }

    const statusUpdate = await Comment.update(id, updateComment);
    const affectedRows = statusUpdate.raw.affectedRows;
    if (affectedRows > 0) {
      response.code = 201;
      response.message = MessageEnum.updated;
    } else {
      loggerBody.level= loggerLevelEnum.warn;
      response.code = 400;
      response.message = MessageEnum.noMatch;
    }
  } catch (error) {
    res.send(catchErrorReponse(error, loggerBody));
    return;
  }

  loggerBody.name = "editComment()";
  loggerBody.entity = entityEnum.comment;
  loggerTime.done(loggerBody);
  res.send(response);
};

// FUNCTIONS

const sendValidations = (errorList: ValidationError[]) => {
  return errorList.map((error) => ({
    field: error.property,
    message: error.constraints,
  }));
};
