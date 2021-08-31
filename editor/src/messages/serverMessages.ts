

// Сообщения не привязанные к конкретному месту
export const serverMessages = {
    // NEXT TIME USE COMMON VALUES! FOR EXAMPLE: EMAILS, PASSWORD AND SO ON.

    authGuard_userIsNotAuthorized: {
        eng: 'This request requires authorization.',
        rus: 'Для этого запроса требуется авторизация.'
    },

    user_getTokenData_tokenIsNotPassed: {
        eng: 'Token was not passed or it is wrong.',
        rus: 'Токен не был передан в запросе.'
    },
    user_createUser_alreadyRegistered: {
        eng: 'The user with this email is signed up already.',
        rus: 'Пользователь с такой почтой уже зарегистрирован.'
    },
    user_login_userDoesNotExist: {
        eng: 'User is not exist or password is wrong.',
        rus: 'Пользователь не зарегистрирован или передан неправильный пароль.'
    },
    user_login_userDoesNotConfirmEmail: {
        eng: 'You must confirm your email. A confirmation link was sent to your email when you registered.',
        rus: 'Вы должны подтвердить свою почту. Ссылка на подтверждение была отправлена на почту при регистрации.'
    },
    user_CreateUserDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_CreateUserDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_CreateUserDto_EmptyEmail: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },
    user_CreateUserDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_CreateUserDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    user_LoginDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_LoginDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_LoginDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },
    user_LoginDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_LoginDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    user_sendConfirmLetter_userIsNotExist: {
        eng: 'User with such mail was not found.',
        rus: 'Пользователь с такой почтой не найден.'
    },
    user_sendConfirmLetter_emailIsConfirmed: {
        eng: 'User has already confirmed mail.',
        rus: 'Пользователь уже подтвердил почту.'
    },

    user_SendConfirmLetterDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_SendConfirmLetterDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_SendConfirmLetterDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_confirmEmail_userIsNotFound: {
        eng: 'User not found. The email is either already confirmed or has not yet been registered.',
        rus: 'Пользователь не найден. Почта или уже подтверждена или еще не была зарегистрирована.'
    },

    user_ResetPasswordDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_ResetPasswordDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_ResetPasswordDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_resetPassword_userIsNotFound: {
        eng: 'There is no user with this email address.',
        rus: 'Не найдено пользователя с такой почтой.'
    },
    user_resetPassword_failedToSendEmail: {
        eng: 'There was an error sending the email. Try again later.',
        rus: 'Не удалось отправить письмо. Попробуйте позже.'
    },

    user_ChangeResetPasswordDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_ChangeResetPasswordDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    /*user_changeResetPassword_userIsNotFound: {
        eng: 'User not found. Maybe the password reset token is wrong or the password has not been reset.',
        rus: 'Пользователь не найден. Возможно токен сброса пароля неправильный или пароль не сбрасывали.'
    },*/

    user_ChangeEmailDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_ChangeEmailDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_ChangeEmailDto_EmptyEmail: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_changeEmail_NoEmail: {
        eng: 'The new mail must be specified.',
        rus: 'Должна быть указана новая почта.'
    },
    user_changeEmail_NewEmailISEqualToCurrent: {
        eng: 'Existing email was passed. Write a new one to change existing one.',
        rus: 'Передана существующая почта. Передайте другую чтобы её изменить.'
    },
    user_changeEmail_NewEmailISUsedByAnotherUser: {
        eng: 'The email is used by another user.',
        rus: 'Почта занята другим пользователем.'
    },

    user_ChangePasswordDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_ChangePasswordDto_currentPasswordIsEmpty: {
        eng: 'You must specify the current password.',
        rus: 'Должен быть указан текущий пароль.'
    },
    user_ChangePasswordDto_newPasswordIsEmpty: {
        eng: 'You must specify the new password.',
        rus: 'Должен быть указан новый пароль.'
    },
    user_changePassword_PasswordsIsNotMatch: {
        eng: 'The current user password does not match the one entered.',
        rus: 'Текущий пароль пользователя не совпадает с введённым.'
    },
}
