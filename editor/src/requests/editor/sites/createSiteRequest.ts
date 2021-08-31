import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {String} name — название сайта
 */
export default async function createSiteRequest(name: string) {
    const options = {
        method: 'POST',
        body: JSON.stringify({name})
    }
    const response: CreateSiteRequestServerResponse = await makeFetch(getApiUrl('sites'), options)
    return response
}


// Тип данных с ответом от пользователя
type CreateSiteRequestServerResponse = ErrorServerResponseType | SuccessResponse



// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        site: {
            id: string // "60c6e368fd09180020febc9a",
            name: string // "РУСХИТ"
        }
    }
}
