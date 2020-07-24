import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { catchErrorTypeOrm } from "../../utils/catchError";
import { Comment } from "../../entities/Comment";
import { statusEntities } from "../../types/statusEntities";

export const deleteComment = async (req: Request, res: Response) => {
  const ids: string[] = req.body;
  let response: iResponse = { code: 0, message: "", data: [] };

  try {
    const statusList = await deleteComments(ids);

    const validatedComments = getValidComments(ids, statusList);

    const error = validatedComments.some((item) => !item.isDeleted);
    if (!error) {
      response = {
        code: 200,
        message: MessageEnum.deleted,
        data: validatedComments,
      };
    } else {
      let splitCommentStatus: { deleted: string[]; noDeleted: string[] } = {
        deleted: [],
        noDeleted: [],
      };
      splitCommentStatus.deleted = validatedComments
        .filter((item) => item.isDeleted)
        .map((i) => i.id);

      splitCommentStatus.noDeleted = validatedComments
        .filter((item) => !item.isDeleted)
        .map((i) => i.id);

      response = {
        code: 404,
        message: MessageEnum.noMatch,
        data: splitCommentStatus,
      };
    }
  } catch (error) {
    catchErrorTypeOrm(error);
  }
  res.send(response);
};

// FUNCTIONS

const deleteComments = async (ids: string[]): Promise<number[]> => {
  let statusDelete: any;
  let result: number[] = [];
  for (const id of ids) {
    statusDelete = await Comment.update(id, {
      status: statusEntities.Deleted,
    });
    result.push(statusDelete.raw.affectedRows);
  }
  return result;
};

const getValidComments = (ids: string[], statusList: number[]) => {
  const result = [];
  for (const [i, id] of ids.entries()) {
    const isDeleted = statusList[i] > 0 ? true : false;
    result.push({ id, isDeleted });
  }
  return result;
};
