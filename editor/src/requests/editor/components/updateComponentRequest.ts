import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'


/**
 * Функция сохраняет шаблон компонента
 * @param {String} compItemId — uuid сохраняемого компонента
 * @param {String} name — название компонента
 * @param {String} code — код компонента
 */
export async function updateComponentRequest(
    compItemId: string, name: string, code: null | string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            code
        })
    }
    const response: UpdateComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', compItemId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type UpdateComponentRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        component: {
            code: string // "123"
            name: string // "Component"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
            uuid: string // "7404685d-ced3-4d14-9939-c8c0c6c0f6e3"
        }
    }
}
