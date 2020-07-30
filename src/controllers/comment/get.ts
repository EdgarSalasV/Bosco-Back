import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { Request, Response } from "express";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTime } from "../../utils/logger/loggerTime";
import { loggerLevelEnum, loggerMessageEmum } from "../../types/logger";
import { entityEnum } from "../../types/entities";

const loggerBody = {
  level: loggerLevelEnum.info,
  message: loggerMessageEmum.controller,
  entity: entityEnum.comment,
  name: "",
  description: "",
};

export const getCommentList = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();

  let response: iResponse = { code: 0, message: "", data: [] };
  let commentList: Comment[] = [];

  try {
    commentList = await Comment.find();
    response = { code: 200, message: MessageEnum.ok, data: commentList };
  } catch (error) {
    res.send(catchErrorReponse(error, loggerBody));
    return;
  }

  if (commentList.length === 0) {
    loggerBody.level = loggerLevelEnum.warn;
    response = { code: 400, message: MessageEnum.noData, data: [] };
  }

  loggerBody.name = "getCommentList()";
  loggerBody.entity = entityEnum.comment;
  loggerTime.done(loggerBody);
  res.send(response);
};

export const getCommentByID = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();

  const { id } = req.params;
  let response: iResponse = { code: 0, message: "", data: {} };
  let comment: {} | undefined = {};

  try {
    comment = await Comment.findOne(id);
    response.code = 200;
  } catch (error) {
    res.send(catchErrorReponse(error, loggerBody));
  }

  if (typeof comment == "undefined") {
    loggerBody.level = loggerLevelEnum.warn;
    response.message = MessageEnum.noData;
    response.code = 400;
  } else {
    loggerBody.level = loggerLevelEnum.info;
    response.message = MessageEnum.ok;
    response.data = comment;
  }

  loggerBody.name = "getCommentByID()";
  loggerBody.entity = entityEnum.comment;
  loggerTime.done(loggerBody);

  console.log("commentFINAL", comment);
  res.send(response);
};
