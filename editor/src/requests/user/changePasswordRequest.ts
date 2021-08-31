import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from '../errorServerResponseType'
import UserServerResponseType from './userServerResponseType'

/**
 * Изменение текущего пароля
 */
export default async function changePasswordRequest(currentPassword: string, newPassword: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            currentPassword,
            newPassword
        })
    }
    const response: ChangePasswordRequestServerResponse = await makeFetch(
        getApiUrl('changePassword'), options
    )

    return response
}

// Тип данных с ответом от пользователя
type ChangePasswordRequestServerResponse = ErrorServerResponseType | UserServerResponseType
