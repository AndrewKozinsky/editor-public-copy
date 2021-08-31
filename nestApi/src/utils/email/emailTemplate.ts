import { baseTemplate } from './letters/functions/baseTemplate'
import { confirmLetterContentTemplate } from './letters/functions/confirmLetterContentTemplate'
import { forgotPasswordLetterContentTemplate } from './letters/functions/forgotPasswordLetterContentTemplate'

// Класс содержит методы для создания разметки писем различных типов.
// Возвращается текстовую и HTML-версия письма.
export class EmailTemplate {
    domain: string

    constructor(domain: string) {
        this.domain = domain
    }

    // Функция создаёт шаблон письма с просьбой подтвердить почтовый адрес
    createConfirmLetter(token: string, lang: string) {
        // Получить разметку содержимого письма подтверждения почты
        const letterContent = confirmLetterContentTemplate(this.domain, token, lang)

        // Текстовая версия письма
        const textContent = lang === 'rus'
            ? `Ваш адрес был указан при регистрации/смене почты на сервисе Editorium. Пожалуйста, подтвердите почту перейдя по адресу: ${this.domain}/editor/confirm-email и в открывшейся форме укажите токен ${token}. Если вы не регистрировались на этом сервисе или не отправляли запрос на изменение почты, то проигнорируйте это письмо.`
            : `Your address was given when you registered/changed your email at Editorium. Please confirm your email address by going to: ${this.domain}/editor/confirm-email and then entering your token ${token} in the form that appears. If you have not registered on this service or have not sent a request to change your mail, then ignore this email.`

        // Получить каркас письма и вставить в него содержимое
        const htmlTemplate = baseTemplate(this.domain, letterContent, lang)

        return [htmlTemplate, textContent]
    }

    // Функция создаёт шаблон письма со ссылкой на сброс пароля
    createForgotPasswordLetter(resetToken: string, lang: string) {
        const letterContent = forgotPasswordLetterContentTemplate(this.domain, resetToken, lang)

        // Текстовая версия письма
        const textContent = lang === 'rus'
            ? `Был сделан запрос на сброс пароля. Перейдите по адресу ${this.domain}/editor/change-reset-password чтобы подтвердить сброс и вписать новый пароль. Будет открыта форма куда введите токен сброса: ${resetToken}. Если вы не делали запрос на сброс пароля, то проигнорируйте это письмо.`
            : `A password reset request has been made. Go to ${this.domain}/editor/change-reset-password to confirm the reset and enter a new password. A form will open where you enter the reset token: ${resetToken}. If you did not request a password reset, ignore this email.`

        // Получить каркас письма и вставить в него содержимое
        const htmlTemplate = baseTemplate(this.domain, letterContent, lang)

        return [htmlTemplate, textContent]
    }
}
