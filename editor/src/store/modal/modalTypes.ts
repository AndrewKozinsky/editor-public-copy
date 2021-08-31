import { ReactElement } from 'react'

namespace StoreModalTypes {

    // Типы значений
    // Открыто ли модальное окно
    export type IsOpen = boolean
    // Содержимое модального окна
    export type Content = ReactElement

    // Типы типа и тип экшена
    // Открытие модального окна
    export const MODAL_OPEN = 'MODAL_OPEN'
    export type OpenModalAction = {
        type: typeof MODAL_OPEN,
        payload: Content
    }

    // Закрытие модального окна
    export const MODAL_CLOSE = 'MODAL_CLOSE'
    export type CloseModalAction = {
        type: typeof MODAL_CLOSE
    }


    export type ModalAction =
        | OpenModalAction
        | CloseModalAction
}

export default StoreModalTypes
