import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/** Функция получает список сайтов пользователя */
export default async function sitesRequest() {
    const options = { method: 'GET'}
    const response: SitesRequestServerResponse = await makeFetch(getApiUrl('sites'), options)

    return response
}


// Тип данных с ответом от пользователя
type SitesRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        sites: {
            defaultIncFilesTemplateId: null | string
            name: string // "РУСХИТ"
            _id: string // "60c89dccfe73df002a1c4fa4"
        }[]
    }
}
