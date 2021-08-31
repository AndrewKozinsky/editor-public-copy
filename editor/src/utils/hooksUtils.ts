import {ReactElement, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'

/**
 * Хук возвращает функцию показывающую модальное окно с переданным содержимым
 * @param modalContent
 */
export default function useGetShowModal(modalContent: ReactElement) {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const isOpen = useSelector((store: AppStateType) => store.modal.isOpen)

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно подтверждения удаления шаблона подключаемых файлов
            dispatch(actions.modal.openModal(
                modalContent
            ))
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen && isModalOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return () => setIsModalOpen(true)
}
