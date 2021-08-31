import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} siteId — id сайта у которого нужно получить шаблоны подключаемых файлов
 */
export default async function getIncFilesTemplatesRequest(siteId: string) {

    const options = { method: 'GET' }
    const response: GetIncFilesTemplatesRequestServerResponse = await makeFetch(
        getApiUrl('incFiles', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type GetIncFilesTemplatesRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        templates: {
            _id: string
            name: string
            head: null | string
            body: null | string
        }[]
    }
}
