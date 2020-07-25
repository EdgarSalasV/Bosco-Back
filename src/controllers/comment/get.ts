import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { Request, Response } from "express";
import { catchErrorTypeOrm } from "../../utils/catchError";
import { logger, logerTime } from "../../utils/logger";
import { levelsWinston } from "../../types/winston";
import { entity } from "../../types/entities";

export const getCommentList = async (req: Request, res: Response) => {
  let response: iResponse = { code: 0, message: "", data: [] };
  let commentList: Comment[] = [];

  const responseTime = logerTime.startTimer();
  logger.log({
    level: levelsWinston.info,
    message: "CONTROLLER",
    entity: entity.comment,
    name: "getCommentList",
  });

  try {
    commentList = await Comment.find();
    response = { code: 200, message: MessageEnum.ok, data: commentList };
  } catch (error) {
    // catchErrorTypeOrm(error, entity.comment);
    catchErrorTypeOrm(error);
  }

  if (commentList.length === 0)
    response = { code: 200, message: MessageEnum.noData, data: [] };

  responseTime.done({ entity: "comment", name: "getCommentList()" });
  res.send(response);
};

export const getCommentByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  let response: iResponse = { code: 0, message: "", data: {} };
  let comment: {} | undefined = {};
  try {
    comment = await Comment.findOne(id);
    // response = { code: 200, message: MessageEnum.ok, data: comment };
    response.code = 200;
  } catch (error) {
    res.send(catchErrorTypeOrm(error));
  }

  if (typeof comment == "undefined") response.message = MessageEnum.noData;
  else {
    response.message = MessageEnum.ok;
    response.data = comment;
  }
  res.send(comment);
};
