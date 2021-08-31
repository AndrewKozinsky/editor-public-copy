
export function forgotPasswordLetterContentTemplate(domain: string, resetToken: string, lang: string) {

    // Если нужно отправить письмо на русском языке
    if (lang === 'rus') {
        return `<p class="paragraph">
            Был сделан запрос на сброс пароля. Пожалуйста, щелкните по этой кнопке чтобы подтвердить сброс и вписать новый пароль. Будет открыта форма куда введите токен сброса: <b>${resetToken}</b>
        </p>
        <div class="button-link-wrapper">
            <a href="${domain}/editor/change-reset-password" class="button-link">
                Сбросить пароль
            </a>
        </div>
        <p class="paragraph">
            Если вы не делали запрос на сброс пароля, то проигнорируйте это письмо.
        </p>`
    }
    // В противном случае отправить письмо на английском языке
    else {
        return `<p class="paragraph">
            A password reset request has been made. Please click this button to confirm the reset and enter a new password. A form will open where you enter the reset token: <b>${resetToken}</b>
        </p>
        <div class="button-link-wrapper">
            <a href="${domain}/editor/change-reset-password" class="button-link">
                Reset my password
            </a>
        </div>
        <p class="paragraph">
            If you didn't forget your password, please ignore this email.
        </p>`
    }
}
