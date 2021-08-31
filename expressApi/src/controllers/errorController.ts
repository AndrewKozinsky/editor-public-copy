import {Request, Response, NextFunction} from 'express'
import { config } from '../config/config'
import { getMessageDependingOnTheLang } from '../errors/messages'


type ErrorType = {
    statusCode: number
    status: string // fail или error
    isOperational: boolean
    field: null | string
    name?: string
    message: string
    code?: number
    keyValue: {string: string}
    errors: any[]
}

// Глобальный обработчик ошибок Экспресса
export function globalErrorHandler (err: any, req: Request, res: Response, next: NextFunction) {

    // Объект ошибки
    let error: ErrorType = {
        statusCode: err.statusCode || 500, // Если нет кода ошибки, то значит это ошибка сервера, поэтому 500.
        status: err.status || 'error', // Если нет статуса ошибки, то значит это ошибка сервера, поэтому error.
        isOperational: Boolean(err.isOperational), // Булево значение является ли это ошибкой пользователя
        field: err.field, // Имя поля формы где написаны неправильные данные
        message: err.message, // Текст ошибки
        code: err.code,
        keyValue: err.keyValue,
        errors: err.errors,
    }

    // Вместо шаблонных ошибок в тексте ошибок поставить настоящие ошибки в зависимости от языка
    const lang = <string>req.headers['Editor-Language']
    error.message = getMessageDependingOnTheLang(err.message, lang)

    // Если значение поля должно быть уникальным, но ввели дублирующие значения.
    if(error.code === 11000) error = handleDuplicateFieldsBD(error, lang);
    if(error.errors) error = handleValidationErrorBD(error);
    if(error.name === 'JsonWebTokenError') handleJWTError(error)
    // if(error.name === 'TokenExpiredError') handleJWTExpiredError(error)

    if(config.workMode === 'development') {
        sendErrorDev(error, res)
    }
    else if(config.workMode === 'production') {
        sendErrorProd(error, res)
    }
}

// Функция отправляет ошибочный ответ в режиме разработки
function sendErrorDev(err: ErrorType, res: Response) {
    res
        .status(err.statusCode)
        .json({
            status: err.status,  // fail (неправильные данные от пользователя) или error (ошибка в коде или на сервере)
            errors: {
                statusCode: err.statusCode, // Или 4xx ошибки или 500
                // Булево значение эксплуатационная ли это ошибка.
                // То есть произошла ли она по вине пользователя. Если не эсплуатационная, то ошибка произошла из-за неправильной работы кода.
                isOperational: err.isOperational,
                field: err.field, // Имя поля формы где написаны неправильные данные
                message: err.message,  // Текст ошибки
                code: err.code
            }
        })
}

// Функция отправляет ошибочный ответ в режиме публикации
function sendErrorProd(err: ErrorType, res: Response) {

    if(err.isOperational) {
        res
            .status(err.statusCode)
            .json({
                status: err.status,   // fail или error
                error: {
                    statusCode: err.statusCode,
                    field: err.field, // Имя поля формы где написаны неправильные данные
                    message: err.message, // Сообщение об ошибке
                }
            })
    }
    else {
        res
            .status(500)
            .json({
                status: 'error',
                data: {
                    message: 'Something went wrong!', // Сообщение об ошибке
                }
            })
    }
}


/**
 * В поле, которое должно быть уникальным, передали повторяющееся значение
 * @param {Object} err — объект с данными ошибки
 * @param {String} lang — язык пользователя
 */
function handleDuplicateFieldsBD(err: ErrorType, lang: string): ErrorType {
    const value = Object.values(err.keyValue)[0]

    let message = ''
    if (lang === 'end') message = `Field with value ${value} must be unique. Please set another value!`
    if (lang === 'rus') message = `Поле со значением ${value} должно быть уникальным. Введите другое значение.`

    err.statusCode = 409
    err.message = message
    return err
}


// Ошибка при проверке поля
function handleValidationErrorBD(err: ErrorType) {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data: ${errors.join('. ')}`

    err.statusCode = 400
    err.message = message
    return err
}

// Ошибка в JWT
function handleJWTError(err: ErrorType) {
    err.statusCode = 401
    err.message = 'Invalid token. Please log in again.'
    return err
}

// В JWT истёк срок действия
/*
function handleJWTExpiredError(err: ErrorType) {
    err.statusCode = 401
    err.message = 'Your token has expired. Please log in again.'
    return err
}*/
