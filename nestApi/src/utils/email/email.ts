const nodemailer = require('nodemailer')
const sendpulse = require('sendpulse-api')
import { config } from 'src/config'
import { EmailTemplate } from './emailTemplate'


export class Email {
    to: string
    from: string
    domain: string
    lang: string

    constructor(email: string, lang: string) {
        this.to = email // На какой адрес отправлять письмо
        this.from = config.emailFrom // От кого письмо
        this.domain = config.workMode === 'development' ? config.devSiteURL : config.publishedSiteURL
        this.lang = lang // Язык письма
    }

    // Функция отправляет письмо с просьбой подтвердить почтовый адрес
    async sendConfirmLetter(token: string) {
        // Тема письма
        const subject = this.lang === 'eng'
            ? 'Confirm your email in Editorium.net'
            : 'Подтвердите вашу почту на Editorium.net'

        // Создать html и текстовую версию письма
        const [html, text] = new EmailTemplate(this.domain).createConfirmLetter(token, this.lang)

        // Послать письмо
        this.send(subject, html, text)
    }

    // Функция отправляет письмо со ссылкой на сброс пароля
    async sendForgotPasswordLetter(resetToken: string) {
        const subject = this.lang === 'rus'
            ? 'Ссылка на страницу сброса пароля от Editorium.net'
            : 'Your reset password token (valid for 10 minutes)'

        const [html, text] = new EmailTemplate(this.domain).createForgotPasswordLetter(resetToken, this.lang)
        this.send(subject, html, text)
    }

    // Общая функция отправки письма.
    // В зависимости от режима сервера отправляет письма либо на mailtrap.io либо на реальный адрес
    send(subject: string, htmlContent: string, textContent: string) {
        // Послать письма разными сервисами в зависимости от режима работы
        if(config.workMode === 'development') {
            //@ts-ignore
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
        try {
            await transport.sendMail(mailOptions)
        } catch (err) {
            console.log('ERROR HAPPENED')
            console.log(err)
        }
    }

    // Функция отправляющая письма на настоящий адрес пользователя
    sendRealEmail(subject: string, html: string, text: string) {

        const userId = config.sendpulseApiUserId
        const secret = config.sendpulseApiSecret
        const tokenStorage = config.sendpulseTokenStorage

        sendpulse.init(userId, secret, tokenStorage, (token) => {

            let emailOptions = {
                html,
                text,
                subject,
                from : {
                    name: 'Andrew Kozinsky',
                    email: config.emailFrom
                },
                to: [
                    {
                        email: this.to
                    }
                ]
            }

            try {
                sendpulse.smtpSendMail(showAnswer, emailOptions);
            } catch (err) {
                console.log(err)
            }
        })

        // Функция сообщающая результат отправки письма
        function showAnswer(answer) {}
    }
}
