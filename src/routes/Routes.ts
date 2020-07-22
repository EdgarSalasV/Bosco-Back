// register routes
import { Express, Request, Response } from "express";
import {
  getCommentList,
  getCommentByID,
  addComment,
} from "../controllers/comment";

export const Routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({ hola: "holi leimotiv" });
  });

  //#region COMMENTS
  app.get("/comment/:id", getCommentByID);
  app.post("/comment", addComment);

  app.get("/comments", getCommentList);
  //#endregion COMMENTS
};
