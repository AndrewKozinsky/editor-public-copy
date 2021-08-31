import { makeFetch, useFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from '../errorServerResponseType'
import UserServerResponseType from './userServerResponseType'
import { LoginRequestValuesType } from './loginRequest'


// Функция меняет почту, на которую зарегистрирована учётная запись пользователя
export function useChangeEmailRequest(newEmail: string) {

    // Параметры запроса
    const options = { method: 'PATCH', body: JSON.stringify({email: newEmail})}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<ChangeEmailServerResponse>(getApiUrl('changeEmail'), options)

    return { response, doFetch }
}

export async function changeEmailRequest(newEmail: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ email: newEmail })
    }
    const response: ChangeEmailServerResponse = await makeFetch(getApiUrl('changeEmail'), options)

    return response
}


// Тип данных с ответом от пользователя
type ChangeEmailServerResponse = ErrorServerResponseType | UserServerResponseType