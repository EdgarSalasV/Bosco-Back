// register routes
import { Router, Request, Response } from "express";
import {
  getCommentList,
  getCommentByID,
  addComment,
  editComment,
  deleteComments,
} from "../controllers/comment";
import {
  getTopics,
  getTopicByID,
  editTopic,
  deleteTopics,
  addTopic,
} from "../controllers/topic";

export const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ hola: "holi leimotiv" });
});

//#region COMMENTS
// get
router.get("/comment/:id", getCommentByID);
router.get("/comments", getCommentList);

// post
router.post("/comment", addComment);

// put
router.put("/comment/:id", editComment);

// delete
router.delete("/comments", deleteComments);
//#endregion COMMENTS

//#region TOPICS
//get
router.route("/topics").get(getTopics).delete(deleteTopics);

router.route("/topic/:id").get(getTopicByID).put(editTopic);

//post
router.route("/topic").post(addTopic);
//#endregion TOPICS
