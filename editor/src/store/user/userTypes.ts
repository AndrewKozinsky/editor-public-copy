
namespace StoreUserTypes {
    // Типы значений
    export type AuthTokenStatusType = number
    export type EmailType = string

    // Типы типа и тип экшена
    // Установка статуса токена авторизации
    export const SET_AUTH_TOKEN_STATUS = 'SET_AUTH_TOKEN_STATUS'
    export type SetAuthTokenStatusActionType = {
        type: typeof SET_AUTH_TOKEN_STATUS;
        payload: AuthTokenStatusType;
    }

    // Установка почты пользователя
    export const SET_EMAIL = 'SET_EMAIL'
    export type SetEmailActionType = {
        type: typeof SET_EMAIL;
        payload: EmailType;
    }

    export type UserActionTypes =
        | SetAuthTokenStatusActionType
        | SetEmailActionType
}

export default StoreUserTypes