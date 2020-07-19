import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {Comment} from '../entities/Comment'

export const getComment = async(req:Request,res:Response): Promise<Response> =>{
    const comment = await getRepository(Comment).find();
    return res.json(comment);
}