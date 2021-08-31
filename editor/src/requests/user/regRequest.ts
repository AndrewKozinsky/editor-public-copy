import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import UserServerResponseType from "./userServerResponseType"
import ErrorServerResponseType from '../errorServerResponseType'

/**
 * Функция отправляет данные для регистрации пользователя
 * @param {Object} values — данные для входа
 */
export default async function regRequest(values: RegRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: RegRequestServerResponse = await makeFetch(getApiUrl('signup'), options)
    return response
}

// Данные для входа передаваемые в loginRequest
export type RegRequestValuesType = {
    'email': string
    'password': number | string
}

// Тип данных с ответом от пользователя
type RegRequestServerResponse = ErrorServerResponseType | UserServerResponseType
