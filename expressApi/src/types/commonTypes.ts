import {Request, Response, NextFunction} from 'express'
import {IUser} from '../models/user'

export namespace CommonTypes {
    // Объект с данными токена
    export type JWTDecoded = {
        id: string, iat: number, exp: number
    }

    /** Тип объекта с со строковыми ключами и строковыми значениями */
    export type ObjStringKeyStringVal = {[key: string]: string}
}

export interface ExtendedRequestType extends Request {
    user?: IUser
}
