import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} siteId — id сайта у которого нужно получить шаблоны подключаемых файлов
 * @param {String} templateId — included files template id
 */
export default async function getIncFilesTemplateRequest(siteId: string, templateId: string) {

    const options = { method: 'GET' }
    const response: GetIncFilesTemplatesRequestServerResponse = await makeFetch(
        getApiUrl('incFiles', siteId, templateId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type GetIncFilesTemplatesRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        template: {
            codeInHead: {
                code: string // "codeInHead 4"
            },
            codeBeforeEndBody: {
                code: string // "codeBeforeEndBody 4"
            },
            _id: string // "60cc5dc35405e00071442014",
            name: string // "Мой второй шаблон 50",
            siteId: string // "60ca102ef8cfcc002074b3da"
        }
    }
}
