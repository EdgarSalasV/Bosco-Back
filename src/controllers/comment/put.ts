import { iResponse, MessageEnum } from "../../types/responseExpress";
import { Comment } from "../../entities/Comment";
import { Request, Response } from "express";
import { catchErrorTypeOrm } from "../../utils/catchError";
import { currentTimestamp } from "../../constants/momentTimezone";

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, status, content } = req.body;
    let response: iResponse = { code: 0, message: "", data: {} };
    let comment_update: {} | undefined = {};
    try {
        let comment = await Comment.findOne(id);
        if (typeof comment == "undefined") response.message = MessageEnum.noData;
        else {

            response.message = MessageEnum.ok;

            let updatedComment = new Comment();
            updatedComment.title = title;
            updatedComment.status = Number(status);
            updatedComment.content = content;
            updatedComment.updated_at = currentTimestamp();


            comment_update = await Comment.update({ id: comment.id }, updatedComment);
            

        }

        // response = { code: 200, message: MessageEnum.ok, data: comment };
        response.code = 200;
    } catch (error) {
        res.send(catchErrorTypeOrm(error));
    }

    res.send(response);
};


// comment_updated = await Comment.update({ title, content }, { title: "asd", content: "asd" });
