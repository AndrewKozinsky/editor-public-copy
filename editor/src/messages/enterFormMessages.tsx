import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'

// Форма EnterFormBlock
export const enterFormMessages = {
    // Заголовок формы входа
    formHeader: {
        eng: 'Log in',
        rus: 'Вход'
    },
    emailField: {
        eng: 'E-mail *',
        rus: 'Электронная почта *'
    },
    emailErrInvalid: {
        eng: 'Invalid email address',
        rus: 'Почта написана неправильно'
    },
    passwordField: {
        eng: 'Password *',
        rus: 'Пароль *'
    },
    submitBtnText: {
        eng: 'Log in',
        rus: 'Войти'
    },
    sendAnotherLetter: {
        eng: 'Send another letter',
        rus: 'Отправить письмо еще раз'
    },
    sentWrongData: {
        eng: 'Incorrect email or password',
        rus: 'Неправильная почта и пароль.'
    },
    failedToSendAnotherConfirmationLetter: {
        eng: 'Failed to send another email with a mail confirmation link. Try again after a while.',
        rus: 'Не удалось отправить еще одно письмо со ссылкой на подтверждение почты. Попробуйте еще раз через некоторое время.'
    },
    confirmationLetterWasSent: {
        eng: 'An email has been sent to you with a link to confirm your email. Confirm your email and then log in again.',
        rus: 'На вашу почту отправлено письмо со ссылкой на подтверждение почты. Подтвердите почту и затем зайдите в систему еще раз.'
    },
    confirmRegistrationLetter: {
        eng: 'An email was sent earlier with a link to confirm your mailing address. Without email confirmation the service will not work.',
        rus: 'Ранее было выслано письмо со ссылкой для подтверждения почтового адреса. Без подтверждения почты сервис работать не будет.'
    },
    newUser: {
        eng: <>New User? <Link to='/reg'>Sign up</Link>.</>,
        rus: <>Новый пользователь? <Link to='/reg'>Зарегистрируйтесь</Link>.</>
    },
    forgotPassword: {
        eng: <>Can't remember your password? <Link to='reset-password'>Reset it</Link>.</>,
        rus: <>Не помните пароль? <Link to='reset-password'>Сбросьте</Link>.</>
    }
}
