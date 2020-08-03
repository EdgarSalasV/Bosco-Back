import { loggerTime } from "../../utils/logger/loggerTime";
import { iResponse, MessageEnum } from "../../types/responseExpress";
import {Request, Response} from "express";
import { catchErrorReponse } from "../../utils/catchError";
import { loggerTimeBody } from "../../types/topic";
import { Topic } from "../../entities/Topic";
import { statusEntities } from "../../types/statusEntities";
import { loggerLevelEnum } from "../../types/logger";


export const deleteTopics = async (req: Request, res: Response) => {
    loggerTime.startTimer();
    const ids: string[] = req.body;
    let response: iResponse = {code: 0, message: "", data: []};

    try {
        const statusList = await removeTopics(ids);
        const validatedTopics = getValidTopics(ids, statusList);
        const error = validatedTopics.some((item) => !item.isDeleted);
        
        loggerTimeBody.name = "deleteTopics()";

        if(!error){
            response = {code: 200, message: MessageEnum.deleted, data: validatedTopics}
        }else{
            let splitTopicsStatus: {deleted: string[]; noDeleted: string[]} = {
                deleted: [],
                noDeleted:[]
            };
            splitTopicsStatus.deleted = validatedTopics
            .filter((item) => item.isDeleted)
            .map((i) => i.id);

            splitTopicsStatus.noDeleted = validatedTopics
            .filter((item) => !item.isDeleted)
            .map((i) => i.id);

            loggerTimeBody.level = loggerLevelEnum.warn;
            response = { code: 404, message: MessageEnum.noMatch, data: splitTopicsStatus };
        };
        
    } catch (error) {
        res.send(catchErrorReponse(error, loggerTimeBody));
        return;
    }

    loggerTime.done(loggerTimeBody);
    res.send(response);
};

const removeTopics = async (ids: string[]) => {
    let statusDelete: any;
    let result: number[] = [];

    for(const id of ids){
        statusDelete = await Topic.update(id, {
            status: statusEntities.Deleted
        });
        result.push(statusDelete.raw.affectedRows);
    }
    console.log('result', result)
    return result;
};

const getValidTopics = (ids: string[], statusList: number[]) => {
    const result = [];

    for(const [i, id] of ids.entries()){
        const isDeleted = statusList[i] > 0 ? true : false;
        result.push({id, isDeleted});
    }
    console.log('result', result)
    return result;
}