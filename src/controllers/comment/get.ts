import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { Request, Response } from "express";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTime } from "../../utils/logger/loggerTime";
import { loggerLevelEnum } from "../../types/logger";
import { entityEnum } from "../../types/entities";
import { loggerTimeBody } from "../../types/topic";

export const getCommentList = async (req: Request, res: Response) => {
  //logs
  loggerTime.startTimer();

  let response: iResponse = { code: 0, message: "", data: [] };
  let commentList: Comment[] = [];

  try {
    commentList = await Comment.find();
    response = { code: 200, message: MessageEnum.ok, data: commentList };
  } catch (error) {
    res.send(catchErrorReponse(error, loggerTimeBody));
    return;
  }

  if (commentList.length === 0) {
    loggerTimeBody.level = loggerLevelEnum.warn;
    response = { code: 400, message: MessageEnum.noData, data: [] };
  }

  loggerTimeBody.name = "getCommentList()";
  loggerTimeBody.entity = entityEnum.comment;
  loggerTime.done(loggerTimeBody);
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
    res.send(catchErrorReponse(error, loggerTimeBody));
  }

  if (typeof comment == "undefined") {
    loggerTimeBody.level = loggerLevelEnum.warn;
    response.message = MessageEnum.noData;
    response.code = 400;
  } else {
    loggerTimeBody.level = loggerLevelEnum.info;
    response.message = MessageEnum.ok;
    response.data = comment;
  }

  loggerTimeBody.name = "getCommentByID()";
  loggerTimeBody.entity = entityEnum.comment;
  loggerTime.done(loggerTimeBody);

  res.send(response);
};
