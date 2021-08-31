import {Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../../config/config'
import {IUser} from '../../models/user';

/**
 * Функция возвращает ответ с токеном авторизации
 * @param {Object} res — объект ответа сервера
 * @param {Number} statusCode — код ответа сервера
 * @param {Object} user —
 */
export function sendResponseWithAuthToken(user: IUser, res: Response, statusCode = 200) {
    res.status(statusCode).json({
        status: 'success',
        data: {
            user: {
                name: user.name,
                email: user.email
            }
        }
    })
}

/**
 * Функция создающая токен авторизации и ставящая его в куку в объекте ответа сервера.
 * @param {String} userId — id пользователя
 * @param {Object} res — объект ответа сервера
 */
export function createSendToken(userId: string, res: Response) {
    // Подписание токена авторизации
    const token = signToken(userId)

    // Когда истекает действие куки авторизации
    const cookieOptions = {
        expires: new Date(Date.now() + config.jwtExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // Установка куки авторизации в ответ
    res.cookie('authToken', token, cookieOptions)

    return res
}


/**
 * Функция создающая токен пользователя по переданному ID
 * @param {String} userId — id пользователя
 * @returns {undefined|*}
 */
function signToken(userId: string) {
    return jwt.sign(
        { id: userId },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn + config.jwtExpiresUnit }
    )
}
