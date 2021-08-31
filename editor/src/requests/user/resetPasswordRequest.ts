import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

import ErrorServerResponseType from "../errorServerResponseType"
import UserServerResponseType from "./userServerResponseType"

/**
 * Функция отправляет данные для сброса пароля
 * @param {String} email — почта у которой нужно сбросить пароль
 */
export default async function resetPasswordRequest(email: string) {
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }
    const response: ResetPasswordRequestServerResponse = await makeFetch(getApiUrl('resetPassword'), options)
    return response
}


// Тип данных с ответом от пользователя
type ResetPasswordRequestServerResponse = ErrorServerResponseType | UserServerResponseType