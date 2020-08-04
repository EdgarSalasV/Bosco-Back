// register routes
import { Express, Request, Response } from "express";
import {
  getCommentList,
  getCommentByID,
  addComment,
  editComment,
  deleteComments,
} from "../controllers/comment";
import { getTopics, getTopicByID, editTopic, deleteTopics } from "../controllers/topic";

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
  app.put("/comment/:id", editComment);

  // delete
  app.delete("/comments", deleteComments);

  //#endregion COMMENTS

  //#region TOPICS
  //get
  app.route("/topics")
  .get(getTopics)
  .delete(deleteTopics);

  app.route("/topic/:id")
  .get(getTopicByID)
  .put(editTopic);

  //#endregion TOPICS
};
