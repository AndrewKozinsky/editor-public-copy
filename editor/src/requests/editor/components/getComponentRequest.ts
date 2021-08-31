import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import FilesTreeType from '../../../types/filesTree'


/** Функция получает данные статьи */
export default async function getComponentRequest(componentUuid: FilesTreeType.UuId) {

    const options = { method: 'GET' }
    const response: GetComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', componentUuid), options
    )

    return response
}

// Тип данных с ответом от пользователя
type GetComponentRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        component: ComponentDataType
    }
}

export type ComponentDataType = {
    uuid: string // "7debef2a-327c-413e-994d-aa75b32ff596"
    siteId: string // "60c6e368fd09180020febc9a"
    name: string // "New component"
    code: null | string
}
