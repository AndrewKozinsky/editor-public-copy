import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import { store } from 'src/store/rootReducer'

/**
 * Функция создаёт новую статью
 * @param {String} uuid — uuid шаблона компонента
 * @param {String} name — имя шаблона компонента
 * @param {String} code — код шаблона компонента
 */
export default async function createArticleRequest(uuid: string, name: string, code: null | string) {
    const siteId = store.getState().sites.currentSiteId

    const options = {
        method: 'POST',
        body: JSON.stringify({
            uuid,
            siteId,
            name,
            code
        })
    }
    const response: CreateNewArticleServerResponse = await makeFetch(
        getApiUrl('article'), options
    )

    return response
}

// Тип данных с ответом от пользователя
type CreateNewArticleServerResponse = ErrorServerResponseType | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        article: {
            code: null | string
            id: string // "60c9695cfe73df002a1c4fb7"
            siteId: string // "60c8c3d9fe73df002a1c4fab"
            uuid: string // "9ae6a037-b217-4374-bb5e-47ae696ace56"
        }
    }
}
