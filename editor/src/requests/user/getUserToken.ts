import getApiUrl from 'requests/reqFn/apiUrls'
import { useFetch } from 'requests/reqFn/fetch'
import UserServerResponseType from './userServerResponseType'
import ErrorServerResponseType from '../errorServerResponseType'


// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(getApiUrl('getUserToken'), options)

    return { userToken, doFetch }
}

// Тип данных с ответом от пользователя
type GetTokenDataServerResponse = ErrorServerResponseType | UserServerResponseType