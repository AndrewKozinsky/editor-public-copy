const nodemailer = require('nodemailer')
const sendpulse = require('sendpulse-api')
import { EmailTemplate } from './emailTemplate'
import { config } from '../../config/config'


export class Email {
    to: string
    from: string
    host: string
    lang: string

    constructor(email: string, host: string, lang: string) {
        this.to = email // На какой адрес отправлять письмо
        this.from = config.emailFrom // От кого письмо
        this.host = host // Домен сайта
        this.lang = lang // Язык письма
    }

    // Функция отправляет письмо с просьбой подтвердить почтовый адрес
    async sendConfirmLetter(token: string) {
        // Тема письма
        const subject = this.lang === 'rus'
            ? 'Подтвердите вашу почту для регистрации на Editorium.net'
            : 'Confirm your email for registration at Editorium.net'

        // Создать html и текстовую версию письма
        const [html, text] = new EmailTemplate(this.host).createConfirmLetter(token, this.lang)

        // Послать письмо
        this.send(subject, html, text)
    }

    // Функция отправляет письмо со ссылкой на сброс пароля
    async sendForgotPasswordLetter(resetToken: string) {
        const subject = this.lang === 'rus'
            ? 'Ссылка на страницу сброса пароля от Editorium.net'
            : 'Your reset password token (valid for 10 minutes)'

        const [html, text] = new EmailTemplate(this.host).createForgotPasswordLetter(resetToken, this.lang)
        this.send(subject, html, text)
    }

    // Общая функция отправки письма.
    // В зависимости от режима сервера отправляет письма либо на mailtrap.io либо на реальный адрес
    send(subject: string, htmlContent: string, textContent: string) {

        // Послать письма разными сервисами в зависимости от режима работы
        if(config.workMode === 'development') {
            this.sendFakeEmail(subject, htmlContent, textContent)
        }
        else if(config.workMode === 'production') {
            this.sendRealEmail(subject, htmlContent, textContent)
        }
    }

    // Функция отправляющая письма на mailtrap.io
    async sendFakeEmail(subject: string, html: string, text: string) {

        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text
        }

        // Create a transport
        const transport = nodemailer.createTransport({
            host: config.fakeEmailDomain,
            port: config.fakeEmailPort,
            auth: {
                user: config.fakeEmailUsername,
                pass: config.fakeEmailPassword
            }
        })

        // 3) Send email
        await transport.sendMail(mailOptions)
    }

    // Функция отправляющая письма на настоящий адрес пользователя
    sendRealEmail(subject: string, html: string, text: string) {
        const userId = config.sendpulse_api_user_id
        const secret = config.sendpulse_api_secret
        const tokenStorage = config.sendpulse_token_storage

        sendpulse.init(userId, secret, tokenStorage, (token) => {

            // Функция сообщающая результат отправки письма
            // В неё первым аргументом попадёт объект отчёта об отправке
            function answerGetter(data) { }

            let email = {
                html,
                text,
                subject,
                'from' : {
                    'name' : 'To Do App',
                    'email' : this.from
                },
                'to' : [
                    { "email" : this.to }
                ]
            };

            sendpulse.smtpSendMail(answerGetter, email);
        })
    }
}