import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {getRepository} from 'typeorm'
import {Comment} from './entities/Comment'

const PORT: number = Number(process.env.PORT) || 8080;
const URL_GENERAL: string = process.env.URL_GENERAL || "http:127.0.0.1:";
console.log("process.PORT", process.env.PORT);

// create and setup express app
async function main() {
const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// register routes
app.get("/", (req: Request, res: Response) => {
  res.send("holi leimotiv");
});
app.get("/comment", async(req:Request,res:Response): Promise<Response> =>{
  const comment = await getRepository(Comment).find();
  return res.json(comment)
});

// start express server
app.listen(PORT);
console.log(`server running on ${URL_GENERAL + PORT}`);
}

main();