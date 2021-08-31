import React from 'react'
//@ts-ignore
import { getDomainFromEmail } from 'utils/StringUtils'
//@ts-ignore
import { Link } from 'react-router-dom'
//@ts-ignore
import disclaimerPdfLink from 'entrance/RegFormBlock/docs/Disclaimer.pdf'
//@ts-ignore
import policyOnPersonalDataProcessingPdfLink from 'entrance/RegFormBlock/docs/Policy_on_personal_data_processing.pdf'
//@ts-ignore
import consentToTheNewsletterPdfLink from 'entrance/RegFormBlock/docs/Consent_to_the_newsletter.pdf'



// Форма RegFormBlock
export const regFormMessages = {
    // Заголовок формы регистрации
    formHeader: {
        eng: 'Sign up',
        rus: 'Регистрация'
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
    passwordConfirmField: {
        eng: 'Repeat password *',
        rus: 'Повторите пароль *'
    },
    passwordsMustMatch: {
        eng: 'Passwords must match',
        rus: 'Пароли должны совпадать'
    },
    submitBtnText: {
        eng: 'Sign up',
        rus: 'Зарегистрироваться'
    },
    confirmRegistrationLetter: {
        eng: 'An email with a link to confirm your mailing address was sent to the specified email address. Click on it to activate your account.',
        rus: 'На указанную почту выслано письмо со ссылкой для подтверждения почтового адреса. Перейдите по ней чтобы активировать учётную запись.'
    },
    doYouHaveAccount: {
        eng: <>Already have an account? <Link to='/enter'>Log in</Link>.</>,
        rus: <>Уже есть учётная запись? <Link to='/enter'>Войдите</Link>.</>
    },
    legal: {
        eng: <>By registering on this site, you acknowledge acceptance of <a href={disclaimerPdfLink} target='_blank'>the terms of the disclaimer</a>, <a href={policyOnPersonalDataProcessingPdfLink} target='_blank'>personal data processing policy</a>, and <a href={consentToTheNewsletterPdfLink} target='_blank'>consent to the mailing list</a>.</>,
        rus: <>Регистрируясь на этом сайте вы подтверждаете принятие условий <a href={disclaimerPdfLink} target='_blank'>отказа от ответственности</a>, <a href={policyOnPersonalDataProcessingPdfLink} target='_blank'>политики в отношении обработки персональных данных</a> и <a href={consentToTheNewsletterPdfLink} target='_blank'>согласие с рассылкой</a>.</>
    },
}