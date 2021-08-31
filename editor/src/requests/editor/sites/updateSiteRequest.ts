import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {String} siteId — id сайта
 * @param {String} name — название сайта
 * @param {String} defaultIncFilesTemplateId — id шаблона подключаемых файлов по умолчанию
 */
export default async function updateSiteRequest(
    siteId: string, name: string, defaultIncFilesTemplateId: null | string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            defaultIncFilesTemplateId,
            siteId
        })
    }
    const response: UpdateSiteRequestServerResponse = await makeFetch(getApiUrl('site', siteId), options)

    return response
}


// Тип данных с ответом от пользователя
type UpdateSiteRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        site: {
            defaultIncFilesTemplateId: null | string
            name: string // "РУСХИТ"
            userId: string // "60c626f9fd09180020febc99"
            _id: string // "60c89dccfe73df002a1c4fa4"
        }
    }
}
