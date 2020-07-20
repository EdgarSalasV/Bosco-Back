import {Comment} from '../entities/Comment'

export enum Message {
    ok = 'ok',
    error = 'error',
    warning = 'warning',
}

export interface iResult {
    code: number,
    message: Message | string,
    data: Comment[]
}