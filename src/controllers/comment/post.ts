import { Request, Response } from "express";
import { Comment } from "../../entities/Comment";
import { currentTimestamp } from "../../constants/momentTimezone";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import { catchErrorTypeOrm } from "../../utils/catchError";
import { validate, ValidationError } from "class-validator";

export const addComment = async (req: Request, res: Response) => {
  const { title, status, content } = req.body;
  let response: iResponse = { code: 0, message: "", data: [] };

  try {
    let newComment = new Comment();
    newComment.title = title;
    newComment.status = status;
    newComment.content = content;
    newComment.created_at = currentTimestamp();
    // newComment.updated_at = null;

    const errors = await validate(newComment);

    if (errors.length !== 0) {
      const validations = sendValidations(errors);
      response = { code: 400, message: MessageEnum.warning, data: validations };
      res.send(response);
      return;
    }

    const statusComment = Comment.create(newComment);
    await Comment.save(statusComment);

    response.code = 201;
    response.message = MessageEnum.added;
  } catch (error) {
    res.send(catchErrorTypeOrm(error));
  }
  res.send(response);
};

// FUNCTIONS

const sendValidations = (errorList: ValidationError[]) => {
  // for (const error of errorList) {
  //   console.log("error", error.property);
  //   console.log("error", error.constraints);
  // }
  return errorList.map((error) => ({
    field: error.property,
    message: error.constraints,
  }));
};
