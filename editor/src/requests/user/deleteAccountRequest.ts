import {useFetch} from 'requests/reqFn/fetch'
import { makeFetch } from '../reqFn/fetch'
import getApiUrl from '../reqFn/apiUrls'
import { RegRequestValuesType } from './regRequest'
import ErrorServerResponseType from '../errorServerResponseType'
import UserServerResponseType from './userServerResponseType'


// Хук удаляет учётная запись пользователя
export function useDeleteAccount() {

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteAccountServerResponse>(getApiUrl('me'), options)

    return { response, doFetch }
}



export default async function regRequest() {
    const options = { method: 'DELETE'}

    const response: DeleteAccountServerResponse = await makeFetch(getApiUrl('me'), options)
    return response
}


// Тип данных с ответом от пользователя
type DeleteAccountServerResponse = ErrorServerResponseType | UserServerResponseType
