import { compare } from 'bcrypt'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import { CreateUserDto } from './dto/createUser.dto'
import { createRandomString } from 'src/utils/stringUtils'
import MiscTypes from 'src/types/miscTypes'
import { Email } from 'src/utils/email/email'
import { Response } from 'express'
import { config } from 'src/config'
import { UserResponseInterface } from './types/userResponse.interface'
import responseCommonError from 'src/utils/error/responseCommonError'
import { LoginDto } from './dto/login.dto'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import { SendConfirmLetterDto } from './dto/sendConfirmLetter.dto'
import { ResetPasswordDto } from './dto/resetPassword.dto'
import { ChangeResetPasswordDto } from './dto/changeResetPassword.dto'
import { ChangeEmailDto } from './dto/changeEmail.dto'
import { ChangePasswordDto } from './dto/changePassword.dto'
const crypto = require('crypto')
import { hash } from 'bcrypt'


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getTokenData(request: ExpressRequestInterface): Promise<UserEntity> {
        const token = request?.cookies?.token

        // Если токен не передан, то возвратить ошибочный ответ
        if(!token) sendErrorResponse()

        // Расшифровать JWT и получить payload
        const decodedJWT: MiscTypes.JWTDecoded = await verify(token, config.jwtSecret)

        // Get user by id
        const user = await this.userRepository.findOne(decodedJWT.id)

        // Если пользователь не найден, то вернуть ошибочный ответ
        if (!user) sendErrorResponse()

        // Если почта не подтверждена, то вернуть ошибочный ответ
        if(user.emailConfirmToken) {
            sendErrorResponse()
        }

        // Если все проверки прошли мимо, то вернуть пользователя
        return user

        // Функция возвращающая ошибочный ответ
        function sendErrorResponse() {
            responseCommonError('user_getTokenData_tokenIsNotPassed', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async createUser(createUserDto: CreateUserDto, language: MiscTypes.Language): Promise<UserEntity> {
        // Throw an error if user exists
        if (await this.getUserByEmail(createUserDto.email)) {
            responseCommonError('user_createUser_alreadyRegistered', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Create email confirm token
        const emailConfirmToken = createRandomString()

        const newUser = new UserEntity()

        Object.assign(
            newUser,
            { emailConfirmToken },
            { language },
            createUserDto
        )

        // Отправление письма с подтверждением почты
        await sendEmailAddressConfirmLetter(language, newUser.email, emailConfirmToken)

        return await this.userRepository.save(newUser)
    }

    async login(loginDto: LoginDto): Promise<UserEntity> {
        // Get user by email
        const user = await this.getUserByEmail(loginDto.email)
        if (!user) responseCommonError('user_login_userDoesNotExist')

        const isPasswordMatch = await compare(loginDto.password, user.password)
        if (!isPasswordMatch) responseCommonError('user_login_userDoesNotExist')

        // Throw an error response if user didn't confirm its email
        if (user.emailConfirmToken) {
            responseCommonError('user_login_userDoesNotConfirmEmail')
        }

        return user
    }

    async sendConfirmLetter(sendConfirmLetterDto: SendConfirmLetterDto, language: MiscTypes.Language): Promise<UserEntity> {
        // Получение переданной в body почты
        const email: string = sendConfirmLetterDto.email

        // Поиск пользователя с такой почтой
        const user = await this.getUserByEmail(email)

        // Если пользователь не найден, то возратить ошибку
        if (!user) {
            responseCommonError('user_sendConfirmLetter_userIsNotExist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Если пользователь уже подтвердил почту
        if (!user.emailConfirmToken) {
            responseCommonError('user_sendConfirmLetter_emailIsConfirmed', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Отправление письма с подтверждением почты
        await sendEmailAddressConfirmLetter(language, user.email, user.emailConfirmToken)

        return user
    }

    async confirmEmail(token: string): Promise<UserEntity> {

        const user = await this.userRepository.findOne({emailConfirmToken: token})
        // Если пользователь не найден, то возратить ошибку
        if (!user) {
            responseCommonError('user_confirmEmail_userIsNotFound', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Erase emailConfirmToken property because email has been confirmed.
        user.emailConfirmToken = ''
        // Delete password from user not to save because User Entity will change it
        delete user.password

        await this.userRepository.save(user)

        return user
    }

    async resetPassword(sendConfirmLetterDto: ResetPasswordDto, language: MiscTypes.Language): Promise<UserEntity> {
        // Получение переданной в body почты
        const email: string = sendConfirmLetterDto.email

        // Поиск пользователя с такой почтой
        const user = await this.getUserByEmail(email)

        // Вернуть ошибку если пользователь не найден
        if (!user) {
            responseCommonError('user_resetPassword_userIsNotFound', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Пользователь найден...

        // Создать токен сброса...
        const resetToken = this.getPasswordResetToken()

        // Записать его в свойство passwordResetToken в объект с данными найденного пользователя
        // По нему определяется по какому пользователю нужно сбрасывать пароль.
        user.passwordResetToken = resetToken
        // Delete password from user not to save because User Entity will change it
        delete user.password

        await this.userRepository.save(user)

        // Послать пользователю письмо со сбросом пароля
        try {
            // Создать письмо
            const userEmail = new Email(user.email, language)

            // Отправить письмо со сбросом пароля
            await userEmail.sendForgotPasswordLetter(resetToken)

            // Send user data
            return user
        }
        // Не удалось отправить письмо со сбросом пароля...
        catch (err) {
            // Бросить ошибку
            responseCommonError('user_resetPassword_failedToSendEmail', HttpStatus.FAILED_DEPENDENCY)
        }
    }

    async changeResetPassword(changeResetPasswordDto: ChangeResetPasswordDto, token: string): Promise<UserEntity> {
        // Найду пользователя по токену смены пароля
        const user = await this.userRepository.findOne({passwordResetToken: token})

        // Бросить ошибку если пользователь не найден.
        if (!user) {
            responseCommonError('user_confirmEmail_userIsNotFound', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        // Пользователь найден...
        // Задание нового пароля и удаление данных для смены пароля
        user.password = changeResetPasswordDto.password
        user.passwordResetToken = ''

        // Сохранить данные пользователя
        return await this.userRepository.save(user)
    }

    async changeEmail(user: UserEntity, changeEmailDto: ChangeEmailDto, language: MiscTypes.Language) {
        // Получу новую почту
        const newEmail = changeEmailDto.email

        // Если почту не передали, то бросить ошибку
        if (!newEmail) {
            responseCommonError('user_changeEmail_NoEmail')
        }

        // Если передали такую же почту, то отправить ошибку
        if (newEmail === user.email) {
            responseCommonError('user_changeEmail_NewEmailISEqualToCurrent')
        }

        // If email is used by another user throw an error
        if (await this.getUserByEmail(newEmail)) {
            responseCommonError('user_changeEmail_NewEmailISUsedByAnotherUser')
        }

        // Create email confirm token
        const emailConfirmToken = createRandomString()

        // Отправление письма с подтверждением почты
        await sendEmailAddressConfirmLetter(language, newEmail, emailConfirmToken)

        const updatedUser = { ...user, emailConfirmToken, email: newEmail }

        return await this.userRepository.save(updatedUser)
    }

    async changePassword(user: UserEntity, changePasswordDto: ChangePasswordDto) {

        // Compare user password in DB and the password which user passed in body
        const isPasswordsMatch = await compare(changePasswordDto.currentPassword, user.password)

        // Throw an error if they are not match
        if (!isPasswordsMatch) {
            responseCommonError('user_changePassword_PasswordsIsNotMatch')
        }

        const hashedPassword = await hash(changePasswordDto.newPassword, 10)
        const updatedUser = { ...user, password: hashedPassword }

        // Поставить новый пароль в данные пользователя
        return await this.userRepository.save(updatedUser)
    }

    async deleteCurrentUser(req: ExpressRequestInterface) {
        const user = req.user

        this.userRepository.delete(user)

        // Удалить все сайты созданные пользователем
        // await SiteModel.deleteMany({ userId: req.user.id })

        // Удалить шаблоны подключения внешних файлов
        // await IncFilesTemplateModel.deleteMany({userId: req.user.id})

        // Удалить папки шаблонов компонентов
        // await ComponentsFoldersModel.deleteMany({userId: req.user.id})

        // Удалить шаблоны компонентов
        // await ComponentModel.deleteMany({userId: req.user.id})

        // Удалить все папки статей созданных пользователем
        // await ArticlesFoldersModel.deleteMany({userId: req.params.siteId})

        // Удалить все статьи созданные пользователем
        // await ArticleModel.deleteMany({userId: req.params.siteId})

        return user
    }


    // ADDITIONAL METHODS

    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({email})
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({id})
    }

    generateToken(user: UserEntity): string {
        return sign(
            { id: user.id },
            config.jwtSecret,
            { expiresIn: '90d' }
        )
    }

    // Метод создающий незашифрованный токен сброса пароля
    getPasswordResetToken(): string {
        // Будет сгенерирована строка вида 2d860d2bb4d2d0184e99e80fac9390ab55bd72a0b545bdf06c34ae9a87cc6d2b
        return crypto.randomBytes(32).toString('hex')
    }


    /**
     * The function form response and send it to clien
     * @param {Object} user — user data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     * @param {String} cookieToken — do I have to put token cookie. none: don't set token; set: set token; clear: clear token
     */
    buildUserResponse(
        user: UserEntity,
        response: Response,
        statusCode: number = HttpStatus.OK,
        cookieToken: 'none' | 'set' | 'clear' = 'none'
    ): void {
        const token = this.generateToken(user)

        const resBody: UserResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    language: user.language,
                    token
                }
            }
        }

        response.statusCode = statusCode

        if (cookieToken === 'set') {
            const cookieOptions = {
                expires: new Date(Date.now() + config.jwtExpiresIn * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            response.cookie('token', token, cookieOptions)
        }
        else if (cookieToken === 'clear') {
            const cookieOptions = {
                expires: new Date(Date.now() + 2 * 1000),
                httpOnly: true
            }
            response.cookie('token', 'loggedout', cookieOptions)
        }

        response.send(resBody)
    }
}


/**
 * Функция отправляющая письмо со ссылкой подтверждения почты при регистрации или смены почты
 * @param {String} language — объект запроса от клиента
 * @param {String} email — почта пользователю, которую он должен подтвердить
 * @param {String} confirmToken — токен подтверждения почты
 * @returns {Promise<void>}
 */
async function sendEmailAddressConfirmLetter(language: MiscTypes.Language, email: string, confirmToken: string) {

    // Создать новое письмо...
    // В конструктор передаётся почта пользователя и URL сайта вида https://editorium.net
    const userEmail = new Email(email, language)

    // Послать письмо для подтверждения почты
    userEmail.sendConfirmLetter(confirmToken).then(() => {})
}
