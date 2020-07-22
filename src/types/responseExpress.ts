import {Comment} from '../entities/Comment'

export enum MessageEnum {
    ok = 'ok',
    error = 'error',
    warning = 'warning',
    added = 'added',
    noData = 'no data'
}

export interface iResponse {
    code: number,
    message: MessageEnum | string,
    data: Comment[] | {}
}