import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'src/store/rootReducer'
// @ts-ignore
import { useHistory, useLocation } from 'react-router-dom'
import { makeCN } from 'src/utils/StringUtils'


/** Хук возвращает классы обёртки компонента App */
export function useGetAppClasses() {

    // Получение текущей темы интерфейса
    const { editorTheme, entryAndEditorViewState } = useSelector((store: AppStateType) => store.settings)

    const [classes, setClasses] = useState<string[]>([])

    useEffect(function() {
        let classesCopy = ['app']
        if (editorTheme === 'dark') classesCopy.push('dark-theme')

        if (entryAndEditorViewState === 'toEntry' || entryAndEditorViewState === 'entry') {
            classesCopy.push('app--second-bg')
        }

        setClasses( classesCopy )
    }, [editorTheme, entryAndEditorViewState])

    return makeCN(classes)
}


/** Хук перенаправляет на определённые страницы в зависимости от статуса токена авторизации. */
export function useRedirectPage() {
    let history = useHistory()
    let location = useLocation()

    // Статус токена авторизации пользователя. Значения: 0, 1 или 2.
    const { authTokenStatus } = useSelector((store: AppStateType) => store.user)

    // При изменении authTokenStatus или адреса страницы...
    useEffect(function () {
        // Ничего не делать если сервер еще не проверил токен входа
        if (authTokenStatus === 0) return

        // Текущий адрес
        const pathname = window.location.pathname

        // Если нахожусь на странице редактора и у пользователя нет правильного токена авторизации...
        if (pathname === '/editor/' && authTokenStatus === 1) {
            // то перебросить на страницу входа
            history.push('/enter')
        }
    }, [authTokenStatus, location.pathname])
}
