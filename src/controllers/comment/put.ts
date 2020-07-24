import { Request, Response } from "express";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { catchErrorTypeOrm } from "../../utils/catchError";

export const editComments = async (req: Request, res: Response) => {
  let response: iResponse = { code: 0, message: "test", data: {} };
  const comment = req.body;
  const { id } = req.params;

  try {
    const statusUpdate = await Comment.update(id, comment);
    const affectedRows = statusUpdate.raw.affectedRows;
    console.log("generatedUpdates", affectedRows);

    if (affectedRows > 0) {
      response.code = 201;
      response.message = MessageEnum.updated;
    } else {
      response.code = 200;
      response.message = MessageEnum.noMatch;
    }
  } catch (error) {
    catchErrorTypeOrm(error);
  }
  res.send(response);
};
