import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import { AppStateType } from 'src/store/rootReducer'
import actions from 'src/store/rootAction';
import { makeCN } from 'src/utils/StringUtils'
import { store } from 'src/store/rootReducer'


/**
 * Функция возращает классы обёртки регистрационных форм в зависимости от адреса
 * Если перешли на страницу редактора, то добавить обёртке дополнительный класс
 * плавно увеличивающий масштаб и увеличивающий прозрачность чтобы форма
 * анимированно исчезла когда пользователь перешёл на страницу редактора.
 */
export function useGetWrapperClasses() {
    const CN = 'entrance-pages-wrapper'

    // Статус токена авторизации
    const { authTokenStatus } = useSelector((store: AppStateType) => store.user)

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useSelector((store: AppStateType) => store.settings)

    const [classes, setClasses] = useState<string[]>([CN])
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (authTokenStatus === 0) {
            setIsVisible(false)
        }
        else if (entryAndEditorViewState === 'editor') {
            setIsVisible(false)
            setClasses([CN, `${CN}--scale-up`])
        }
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses([CN])
            setTimeout(function () {
                setClasses([CN, `${CN}--scale-up`])
            }, 10)
        }
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses([CN, `${CN}--scale-up`])
            setTimeout(function () {
                setClasses([CN])
            }, 10)
        }
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(true)
            setClasses([CN])
        }
        else {
            setIsVisible(false)
            setClasses([CN])
        }
    }, [entryAndEditorViewState])

    return {
        classes: makeCN(classes),
        isVisible
    }
}

/** Хук регулирует показ или окна редактора или окон входа в зависимости от различных условий. */
export function useViewStateChanger() {
    const dispatch = useDispatch()

    // Предыдущий адрес
    const { lastAddress } = useSelector((store: AppStateType) => store.settings)

    let history = useHistory()
    const address = history.location.pathname // Текущий адрес виде /enter

    useEffect(function () {

        // Если сразу открыли редактор...
        if ( !lastAddress && address === '/' ) {
            // Поставить, что должен быть открыт редактор
            dispatch( actions.settings.setEntryAndEditorViewState('editor') )
        }
        // Если сразу открыли страницу входа
        else if (!lastAddress && address !== '/') {
            // Поставить, что должны быть открыты формы входа
            dispatch( actions.settings.setEntryAndEditorViewState('entry') )
        }

        // Поставить текущий адрес в Хранилище в качестве последнего
        dispatch( actions.settings.setLastAddress(address) )
    }, [address])
}

// Если с формы входа перешли в редактор
export function smoothMoveToEditor() {
    // Поставить, что сначала должен быть плавный переход к редактору...
    store.dispatch( actions.settings.setEntryAndEditorViewState('toEditor') )
    setTimeout(function () {
        // ...а затем полное закрытие формы входа через некоторое время
        store.dispatch( actions.settings.setEntryAndEditorViewState('editor') )
    }, 500)
}

// Если с редактора перешли на форму входа
export function smoothMoveToEntrance() {
    // Поставить, что сначала должен быть плавный переход к форме входа...
    store.dispatch( actions.settings.setEntryAndEditorViewState('toEntry') )
    setTimeout(function () {
        // ...а затем полное закрытие редактора через некоторое время
        store.dispatch( actions.settings.setEntryAndEditorViewState('entry') )
    }, 500)
}
