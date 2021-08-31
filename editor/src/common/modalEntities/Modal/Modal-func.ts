import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from 'src/store/rootReducer'
import actions from '../../../store/rootAction'
import { hasElemParentWithSelector } from '../../../utils/elementsUtils'


/** Хук возращает статус нужно ли отрисовывать окно */
export function useGetIsModalOpen() {
    // Открыто ли модальное окно и его содержимое
    const { isOpen } = useSelector((store: AppStateType) => store.modal)

    // Должно ли модальное окно быть отрисовано
    const [isModalOpen, setIsModalOpen] = useState(isOpen)

    // При изменении статуса открытости модального окна
    useEffect(function () {
        setIsModalOpen(isOpen)
    }, [isOpen])

    return isModalOpen
}

/** Хук возвращает функцию закрывающую модальное окно */
export function useGetModalCloseHandler() {
    const dispatch = useDispatch()

    // @ts-ignore
    return function (e: MouseEvent<HTMLDivElement>) {
        // If user clicked on modal outer wrapper but doesn't click on close btn don't close modal
        const clickOnOuterWrapper = hasElemParentWithSelector(e.target, '.modal')
        const clickOnCloseBtn = hasElemParentWithSelector(e.target, '#modal-close-btn')
        if (clickOnOuterWrapper && !clickOnCloseBtn) return

        dispatch(actions.modal.closeModal())
    }
}
