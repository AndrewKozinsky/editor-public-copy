import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import { store } from 'store/rootReducer'


// Тип параметров запроса
type OptionsType = {
    // Request method
    method: string,
    // Additional headers
    headers?: {[key: string]: string},
    // What is it need for?
    [key: string]: undefined | string | {}
}

/** Хук загружающий данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export function useFetch<T>(url: string, options: OptionsType) {

    // Идёт ли сейчас загрузка
    const [isLoading, setIsLoading] = useState(false)

    // Загруженные данные
    const [data, setData] = useState<null|T>(null)

    // Значение ошибки
    const [error, setError] = useState(false)

    // Язык интерфейса
    const editorLanguage = useSelector((store: AppStateType) => store.settings.editorLanguage)

    // Функция запускающая процесс загрузки данных с сервера
    function doFetch() {
        setIsLoading(true)
    }

    useEffect(function () {
        // Если загрузка не требуется, то ничего не делать
        if (!isLoading) return

        // Добавление заголовка языка интерфейса в параметры запроса
        const extraOptions = setLanguageHeader(options, editorLanguage)

        try {
            fetch(url, extraOptions)
                .then(rowData => rowData.json())
                .then(jsonData => {
                    setIsLoading(false)
                    setData(jsonData)
                })
        }
        catch (err) {
            setIsLoading(false)
            setError(err)
        }
    }, [isLoading])

    return {
        isLoading,
        data,
        error,
        doFetch
    }
}

/** Функция загружающая данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export async function makeFetch(url: string, options: OptionsType) {
    const lang = store.getState().settings.editorLanguage

    // Добавление заголовка языка интерфейса в параметры запроса
    const extraOptions = setLanguageHeader(options, lang)

    try {
        const rowData = await fetch(url, extraOptions)
        return await rowData.json()
    }
    catch (err) {
        let message = `Couldn't get data.`
        if (lang === 'rus') message = 'Не удалось получить данные.'
        throw new Error(message)
    }
}

/**
 * Функция добавляет в объект параметров запроса заголовок Editor-Language с языком
 * @param {Object} optionsObj — объект параметров запроса
 * @param {String} lang — язык интерфейса пользователя
 */
function setLanguageHeader(optionsObj: OptionsType, lang = 'eng') {
    return {
        ...optionsObj,
        headers: {
            ...optionsObj.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Editor-Language': lang
        }
    }
}
