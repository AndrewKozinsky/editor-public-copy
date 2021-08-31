import StoreUserTypes from './userTypes'

const userActions = {
    // Установка статуса токена авторизации пользователя
    setAuthTokenStatus(payload: StoreUserTypes.AuthTokenStatusType): StoreUserTypes.SetAuthTokenStatusActionType {
        return {
            type: StoreUserTypes.SET_AUTH_TOKEN_STATUS,
            payload,
        }
    },

    // Установка почты пользователя
    setEmail(payload: StoreUserTypes.EmailType): StoreUserTypes.SetEmailActionType {
        return {
            type: StoreUserTypes.SET_EMAIL,
            payload,
        }
    }
}

export default userActions