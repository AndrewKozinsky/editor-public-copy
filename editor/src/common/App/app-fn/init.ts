import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from 'src/store/rootReducer'
import userActions from 'src/store/user/userActions'
import settingsActions from 'src/store/settings/settingsActions'
import { getFromLocalStorage } from 'src/utils/MiscUtils'
// import sitesActions from 'store/site/sitesActions'
import { useGetUserToken } from 'requests/user/getUserToken'


/** Хук получающий из LocalStorage данные о языке интерфейса, теме и размерах элементов
 *  и заносящий это в Хранилище при запуске приложения */
export function useGetAndSetEditorSettings() {
    const dispatch = useDispatch()

    // При отрисовке компонента...
    useEffect(function () {
        // Получение значения из LocalStorage
        let language = getFromLocalStorage('editorLanguage', 'eng') // Язык интерфейса: eng или rus
        let theme = getFromLocalStorage('editorTheme', 'light') // Тема интерфейса
        let mainTab = getFromLocalStorage('editorTab', 3) // id главной вкладки
        let siteId = getFromLocalStorage('editorSiteId', '') // id сайта
        let settingsTabId = getFromLocalStorage('editorSettingsTabId', 'user') // id вкладки в Настройках
        let sitePartTab = getFromLocalStorage('editorSitePartTab', 0) // id вкладки в Сайтах
        let editorIncFilesId = getFromLocalStorage('editorIncFilesId', null) // id выбранного шаблона подключаемых файлов
        let editorComponentId = getFromLocalStorage('editorComponentId', null) // id выбранного шаблона компонента
        let editorComponentType = getFromLocalStorage('editorComponentType', null) // тип выбранного элемента: папка или компонент
        let editorArticleId = getFromLocalStorage('editorArticleId', null) // id выбранной папки или статьи
        let editorArticleType = getFromLocalStorage('editorArticleType', null) // тип выбранного элемента: папка или статья

        // Поставить значения в Хранилище
        dispatch( settingsActions.setEditorLanguage(language) )
        dispatch( settingsActions.setEditorTheme(theme) )
        dispatch( settingsActions.setMainTab(mainTab) )
        dispatch( sitesActions.setCurrentSiteId(siteId) )
        dispatch( settingsActions.setSettingsPanelTab(settingsTabId) )
        dispatch( sitesActions.setRightMainTab(sitePartTab) )
        dispatch( sitesActions.setCurrentIncFilesTemplateId(editorIncFilesId) )
        dispatch( sitesActions.setCurrentComp(editorComponentId, editorComponentType) )
        dispatch( sitesActions.setCurrentArt(editorArticleId, editorArticleType) )
    }, [])
}


/**
 * Хук устанавливающий статус токена пользователя если он не известен (равен нулю).
 * Изначально токен статуса авторизации пользователя равен нулю.
 * Это значит не известно есть ли токен в куках и правилен ли он.
 * Поэтому делается запрос на сервер для его проверки. И в зависимости от этого статус становится
 * или 1 (токена нет или он неверный) или 2 (токен правильный)
 */
export function useSetTokenStatus() {
    const dispatch = useDispatch()

    // Получение статуса токена из Хранилища
    const { authTokenStatus } = useSelector((store: AppStateType) => store.user)

    // Токен пользователя и функция для его запроса
    const { userToken, doFetch } = useGetUserToken()

    // При загрузке компонента...
    useEffect(function () {
        // Запрос токена пользователя с сервера если не известен его статус
        if (!authTokenStatus) doFetch()
    }, [])

    // При обновлении значения данных по токену...
    useEffect(function () {
        if (!userToken) return

        // Если ответ успешен, то поставить 2, в противном случае токена нет, поэтому 1
        const userTokenStatus = userToken.status === 'success' ? 2 : 1

        // Установка статуса токена в Хранилище
        dispatch( userActions.setAuthTokenStatus(userTokenStatus) )

        // Если успешно зашли, то поставить в Хранилище почту пользователя
        if (userToken.status === 'success') {
            dispatch( userActions.setEmail(userToken.data.user.email) )
        }
    }, [userToken])

    // Проинициализировано ли приложение
    const [isTokenSet, setIsTokenSet] = useState(false)

    // При изменении статуса токена
    useEffect(function () {
        if (!authTokenStatus) return

        // Поставить переменную isTokenSet в true чтобы сообщить, что приложение проинициализировано.
        setIsTokenSet(true)
    }, [authTokenStatus, setIsTokenSet])

    // Возратить проинициализировано ли приложение.
    return isTokenSet
}
