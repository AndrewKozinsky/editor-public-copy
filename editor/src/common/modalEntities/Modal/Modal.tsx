import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'src/store/rootReducer'
import {
    useGetIsModalOpen,
    useGetModalCloseHandler
} from './Modal-func'
import Button from 'common/formElements/Button/Button'
import './Modal.scss'


/** Модальное окно */
export default function Modal() {

    // Содержимое модального окна
    const { content } = useSelector((store: AppStateType) => store.modal)

    // Обработчик закрытия модального окна
    const onModalClose = useGetModalCloseHandler()

    // Открыто ли модальное окно
    const isOpen = useGetIsModalOpen()

    const CN = 'modal'

    // Ничего не отрисовывать если модальное окно закрыто
    if (!isOpen) return null

    return (
        <div className={`${CN}__outer-wrapper`} onClickCapture={(e) => onModalClose(e)}>
            <div className={CN}>
                <Button
                    icon='btnSignClose'
                    onClick={onModalClose}
                    autoFocus
                    extraClass={`${CN}__close-btn`}
                    id='modal-close-btn'
                />
                {content}
            </div>
        </div>
    )
}
