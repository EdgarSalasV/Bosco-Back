// register routes
import { Comment } from "../entities/Comment";
import { iResult, Message } from "../types/responseExpress";
import { Express, Request, Response, query } from "express";

export const Routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({ hola: "holi leimotiv" });
  });
  //#region COMMENTS
  app.get("/comments", async (req: Request, res: Response) => {
    let result: iResult = { code: 0, message: "", data: [] };
    let commentList: Comment[] = [];

    try {
      commentList = await Comment.find();
      console.log("commentList", commentList.length);

      result = { code: 200, message: Message.ok, data: commentList };
    } catch (error) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdasd")
      const { code, errno, sqlMessage, sqlState, sql } = error;
      const errorStatus = `
      code: ${code}, 
      errno: ${errno}, 
      sqlMessage: ${sqlMessage}, 
      sqlState: ${sqlState}, 
      sql: ${sql}
      `;
      console.error("error in comments", errorStatus);
      res.send({
        code: 400,
        message: `${Message.error}:, ${errorStatus}`,
        data: commentList,
      });
    }

    console.log("commentList", commentList.length);
    if (commentList.length === 0)
      result = { code: 201, message: "no data", data: [] };

    res.send(result);
  });
    //#endregion COMMENTS

};
