// register routes
import { Express, Request, Response } from "express";
import {
  getCommentList,
  getCommentByID,
  addComment,
  editComments,
  deleteComment,
} from "../controllers/comment";

export const Routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({ hola: "holi leimotiv" });
  });

  //#region COMMENTS
  // get
  app.get("/comment/:id", getCommentByID);
  app.get("/comments", getCommentList);

  // post
  app.post("/comment", addComment);

  // put
  app.put("/comments/:id", editComments);

  // delete
  app.delete("/comments", deleteComment);

  //#endregion COMMENTS
};
