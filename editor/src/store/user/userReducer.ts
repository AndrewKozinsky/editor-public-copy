import StoreUserTypes from "./userTypes"

export type UserReducerType = {
    authTokenStatus: StoreUserTypes.AuthTokenStatusType
    email: StoreUserTypes.EmailType
}

// Изначальные значения
const initialState: UserReducerType = {
    // Статус токена авторизации:
    // 0 — неизвестно есть ли токен и правилен ли он
    // 1 — токена нет
    // 2 — токен есть и он правильный
    authTokenStatus: 0,
    // Почта пользователя
    email: ''
}

// Установка статуса токена авторизации
function setAuthTokenStatus(state: UserReducerType, action: StoreUserTypes.SetAuthTokenStatusActionType): UserReducerType {
    return {
        ...state,
        authTokenStatus: action.payload
    }
}

// Set user's email
function setEmail(state: UserReducerType, action: StoreUserTypes.SetEmailActionType): UserReducerType {
    return {
        ...state,
        email: action.payload
    }
}

// Редьюсер Store.user
export default function userReducer( state = initialState, action: StoreUserTypes.UserActionTypes ): UserReducerType {
    switch (action.type) {
        case StoreUserTypes.SET_AUTH_TOKEN_STATUS:
            return setAuthTokenStatus(state, action)
        case StoreUserTypes.SET_EMAIL:
            return setEmail(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
