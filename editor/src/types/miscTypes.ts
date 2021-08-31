import { store } from 'store/rootReducer'
import { AppStateType } from 'store/rootReducer'

export namespace MiscTypes {
    /** Тип объекта со строковыми ключами с любым значением */
    export type ObjStringKeyAnyVal = {[key: string]: any}

    /** Тип объекта с со строковыми ключами и строковыми значениями */
    export type ObjStringKeyStringVal = {[key: string]: string}

    /** Object type with string key and Тип объекта с со строковыми ключами и строковыми значениями */
    export type ObjStringKeyGenVal<T> = {[key: string]: T}

    /** Тип объекта с любыми строковыми ключами с любым значением */
    export type ReactRef = null | {current: HTMLElement}

    /** Диспетчер Редакса */
    export type AppDispatch = typeof store.dispatch

    /** Тип аргумента getState для Redux Thunk */
    export type GetState = () => AppStateType
}
