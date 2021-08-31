import { Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
import * as crypto from 'crypto'
import {promisify} from 'util'
import { catchAsync } from '../../errors/catchAsync'
import UserModel from '../../models/user'
import { AppError } from '../../errors/appError'
import { Email } from '../../utils/email/email'
import { createSendToken, sendResponseWithAuthToken } from './authToken'
import { IUser } from '../../models/user'
import {config} from '../../config/config'
import {getMessageDependingOnTheLang} from '../../errors/messages'
import {ExtendedRequestType, CommonTypes } from '../../types/commonTypes'
import SiteModel from '../../models/site'
import IncFilesTemplateModel from '../../models/incFilesTemplate'
import ComponentsFoldersModel from '../../models/componentsFolders'
import ComponentModel from '../../models/component'
import ArticlesFoldersModel from '../../models/articlesFolders'
import ArticleModel from '../../models/article'


// Функция отдающая данные по переданному токену. Токен передаётся в куках.
export const getTokenData = async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    let token

    // Получение токена из кук
    if(req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken
    }

    // Если токен не передан, то возвратить ошибочный ответ
    if(!token) return sendErrorResponse(next)

    // Расшифровать JWT и получить payload
    const decoded = await promisify( jwt.verify )(token, config.jwtSecret)

    // Получить пользователя
    const currentUser = await UserModel.findById(decoded.id)

    // Если пользователь не найден, то вернуть ошибочный ответ
    if(!currentUser) return sendErrorResponse(next)

    // Если пароль изменён с последнего захода, то вернуть ошибочный ответ
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return sendErrorResponse(next)
    }

    // Если почта не подтверждена, то вернуть ошибочный ответ
    if(currentUser.emailConfirmToken) {
        return sendErrorResponse(next)
    }

    // Если все проверки прошли мимо, то вернуть положительный ответ вместе с данными пользователя
    res.status(200).json({
        status: 'success',
        data: {
            name: currentUser.name,
            email: currentUser.email
        }
    })

    // Функция возвращающая ошибочный ответ
    function sendErrorResponse(next: NextFunction) {
        return next(
            new AppError(null, '{{authController.getTokenDataNoCorrectToken}}', 401)
        )
    }
}


// Функция защищающая маршрут от неавторизованных пользователей.
// Если пользователь отправил токен, то программа запускает следующий middleware.
// Если не отправил, то выбрасывает ошибку.
export const protect = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    let token: string | undefined = req.cookies.authToken

    // Если токен не передан, то бросить ошибку
    if(!token) {
        return next(
            new AppError(null, '{{authController.protectNoToken}}', 401)
        )
    }

    // Расшифровка JWT и получение payload
    const decoded: CommonTypes.JWTDecoded = await promisify( jwt.verify )(token, config.jwtSecret)

    // Получение пользователя
    const currentUser: IUser | null = await UserModel.findById(decoded.id).select('+password')

    // Бросить ошибку если пользователь не существует
    if(!currentUser) {
        return next(
            new AppError(null, '{{authController.protectNoUser}}', 401)
        )
    }

    // Проверить что пароль не изменён
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(null, '{{authController.protectPasswordChanged}}', 401)
        )
    }

    // Поставить в req.user данные пользователя и запустить следующий обработчик
    req.user = currentUser
    next()
})


/** Обработчик регистрации пользователя */
export const signUp = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Токен подтверждения почты
    const emailConfirmToken: string = crypto.randomBytes(32).toString('hex')

    // Создание нового пользователя
    const newUser = await UserModel.create({
        email: req.body.email,
        emailConfirmToken: emailConfirmToken,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        language: <string>req.get('Editor-Language') || 'eng'
    })

    // Отправление письма с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, emailConfirmToken)

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                name: newUser.name,
                email: newUser.email
            }
        }
    })
})


// Обработчик подтверждения почты пользователя
export const confirmEmail = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти пользователя с таким же токеном подтверждения почты
    // и удалить свойство emailConfirmToken потому что почта подтверждена.
    const user: IUser | null = await UserModel.findOneAndUpdate(
        { emailConfirmToken: req.params.token },
        { emailConfirmToken: undefined }, // Как изменить объект
        { new: true, useFindAndModify: false } // Вернуть объект после изменения свойства
    )

    // Если пользователь не найден, то бросить ошибку
    if(!user) {
        return next(
            new AppError(null, '{{authController.confirmEmailUserNotFound}}', 400)
        )
    }

    // Пользователь найден...
    // Создать объект ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})


// Вход пользователя
export const logIn = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Почта и пароль из тела запроса
    const email: string = req.body.email
    const password: string = req.body.password

    // Если почту или пароль не передали, то попросить ввести и завершить функцию
    if(!email || !password) {
        return next(
            new AppError(null, '{{authController.loginNoEmailOrPassword}}', 400)
        )
    }

    // Получение данных пользователя с паролем и без __v
    const user: IUser | null = await UserModel.findOne({email}).select('+password -__v')

    // Если пользователь не найден или пароли не совпадают, то бросить ошибку.
    if(!user || !await user.correctPassword(password, user.password)) {
        return next(
            new AppError(null, '{{authController.loginWrongEmailOrPassword}}', 400)
        )
    }

    // Если в данных пользователя в поле emailConfirmToken есть строка,
    // то значит пользователь еще не подтвердил почту. Попросить чтобы подтвердил.
    if(user.emailConfirmToken) {
        return next(
            new AppError(null, '{{authController.loginConfirmEmail}}', 403)
        )
    }

    // Создать объект ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})


/** Обработчик повторной отправки письма с подтверждением почты */
export const sendAnotherConfirmLetter = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получение переданной в body почты
    const email: string = req.body.email

    // Поиск пользователя с такой почтой
    const user: IUser | null = await UserModel.findOne({email})

    // Если пользователь не найден, то возратить ошибку
    if (!user) {
        return next(
            new AppError(null, '{{authController.sendAnotherConfirmLetterUserNotFound}}', 400)
        )
    }

    // Если пользователь уже подтвердил почту
    if (!user.emailConfirmToken) {
        return next(
            new AppError(null, '{{authController.sendAnotherConfirmLetterUserHasConfirmedEmail}}', 400)
        )
    }

    // Отправление письма с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, user.emailConfirmToken)

    res.status(200).json({
        status: 'success'
    })
})

// Выход пользователя (защищённый маршрут)
export const logOut = (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    res.cookie('authToken', 'loggedout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success'
    })
}


// Функция создаёт токен сброса пароля, ставит в ссылку изменения пароля и отправляет на почту пользователя.
export const resetPassword = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получить данные пользователя по переданной почте
    const user: IUser | null = await UserModel.findOne({ email: req.body.email })

    // Вернуть ошибку если пользователь не найден
    if(!user) {
        return next(
            new AppError(null, '{{authController.forgotPasswordNoUser}}', 404)
        )
    }

    // Пользователь найден...

    // Создать токен сброса и записать его в свойство passwordResetToken в объект с данными найденного пользователя
    // По этому токену определяется по какому пользователю нужно сбрасывать пароль.
    const resetToken = user.createPasswordResetToken()

    // Домен сервиса
    const domain = config.workMode === 'development' ? config.devSiteURL : config.publishedSiteURL

    // Язык
    const lang = <string>req.get('Editor-Language')

    // Послать пользователю письмо со сбросом пароля
    try {
        // Создать письмо
        const userEmail = new Email(user.email, domain, lang)

        // Отправить письмо со сбросом пароля
        await userEmail.sendForgotPasswordLetter(resetToken)

        // Сохранить обновлённые данные пользователя
        await user.save({
            validateBeforeSave: false
        })

        // Послать положительный ответ
        res.status(200).json({
            status: 'success',
            data: {
                message: getMessageDependingOnTheLang('{{authController.forgotPasswordEmailHasBeenSent}}', lang),
                email: user.email
            }
        })
    }
        // Не удалось послать письмо со сбросом пароля...
    catch (err) {
        // Бросить ошибку
        return next(
            new AppError(null, '{{authController.forgotPasswordCanNotSendEmail}}', 500)
        )
    }
})


// Функция меняет пароль взамен забытого
export const changeResetPassword = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали пароль или подтверждение пароля, или если они не равны, то бросить ошибку
    if ((!req.body.password || !req.body.passwordConfirm) || (req.body.password !== req.body.passwordConfirm)) {
        return next(
            new AppError(null, '{{authController.resetPasswordPasswordIsNotProvided}}', 400)
        )
    }

    // Зашифровать токен потому что в БД он хранится зашифрованным
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    // Найду пользователя по токену смены пароля
    let user: IUser | null = await UserModel.findOne({
        passwordResetToken: hashedToken,
    })

    // Если срок годности токена сброса просрочен, то обнулить переменную user
    if (user && user.passwordResetExpires) {
        if (Date.now() >= +user.passwordResetExpires) {
            user = null
        }
    }

    // Бросить ошибку если пользователь не найден.
    if (!user) {
        return next(
            new AppError(null, '{{authController.resetPasswordTokenIsInvalid}}', 400)
        )
    }

    // Пользователь найден...
    // Задание нового пароля и удаление данных для смены пароля
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    // Сохранить данные пользователя
    await user.save()

    // Создание объекта ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})

/** Обработчик изменения почтового адреса */
export const changeEmail = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получу новую почту
    const newEmail = req.body.email

    // Если почту не передали, то бросить ошибку
    if(!newEmail) {
        return next(
            new AppError('email', '{{authController.changeEmailNoEmail}}', 400)
        )
    }

    // Если передали такую же почту, то отправить ошибку
    if(req.user && newEmail === req.user.email) {
        return next(
            new AppError('email', '{{authController.changeEmailNewEmailISEqualToCurrent}}', 400)
        )
    }

    // Создам токен подтверждения почты
    const emailConfirmToken = crypto.randomBytes(32).toString('hex');

    // Найду текущего пользователя и обновлю его почту
    const user = await UserModel.findOneAndUpdate(
        {email: req.user?.email},
        {
            email: newEmail,
            emailConfirmToken: emailConfirmToken,
        },
        {new: true, useFindAndModify: false}
    ).select('-_id -emailConfirmToken -__v -passwordChangedAt')

    // Отправление письма с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, emailConfirmToken)

    // Удалю куку авторизации
    res.cookie('authToken', 'loggedout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})


/** Обработчик изменения пароля */
export const changePassword = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получу данные текущего пользователя вместе с паролем.
    const user = await UserModel.findById(req.user?.id).select('+password')
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!user) return

    // Если пользователь ввёл неверный текущий пароль, то бросить ошибку
    if(!await user.correctPassword(req.body.passwordCurrent, user.password)) {
        return next(
            new AppError('passwordCurrent', '{{authController.changePasswordCurrentPasswordIsWrong}}', 401)
        )
    }

    // Поставить новый пароль в данные пользователя
    user.password = req.body.newPassword
    user.passwordConfirm = req.body.newPasswordAgain

    // Соханить пароль в базе данных
    await user.save()

    // Создание объекта ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})


/** Удаление пользователя */
export const deleteMe = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
// Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Удалить пользователя из БД
    await UserModel.findByIdAndDelete(
        req.user.id
    )

    // Удалить все сайты созданные пользователем
    await SiteModel.deleteMany({ userId: req.user.id })

    // Удалить шаблоны подключения внешних файлов
    await IncFilesTemplateModel.deleteMany({userId: req.user.id})

    // Удалить папки шаблонов компонентов
    await ComponentsFoldersModel.deleteMany({userId: req.user.id})

    // Удалить шаблоны компонентов
    await ComponentModel.deleteMany({userId: req.user.id})

    // Удалить все папки статей созданных пользователем
    await ArticlesFoldersModel.deleteMany({userId: req.params.siteId})

    // Удалить все статьи созданные пользователем
    await ArticleModel.deleteMany({userId: req.params.siteId})

    // Обнулить куку авторизации
    res.cookie('authToken', 'loggedout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

    // Отправить пустой ответ
    res.status(200).json({
        status: 'success'
    })
})


/**
 * Функция отправляющая письмо со ссылкой подтверждения почты
 * @param {Object} req — объект запроса от клиента
 * @param {String} email — почта пользователю, которую он должен подтвердить
 * @param {String} confirmToken — токен подтверждения почты
 * @returns {Promise<void>}
 */
async function sendEmailAddressConfirmLetter(req: ExtendedRequestType, email: string, confirmToken: string) {
    // Получение домена в зависимости от режима работы
    const domain = config.workMode === 'development' ? config.devSiteURL : config.publishedSiteURL

    // Язык
    const lang = <string>req.get('Editor-Language')

    // Создать новое письмо...
    // В конструктор передаётся почта пользователя и URL сайта вида https://editorium.net
    const userEmail = new Email(email, domain, lang)

    // Послать письмо для подтверждения почты
    userEmail.sendConfirmLetter(confirmToken).then(() => {})
}
