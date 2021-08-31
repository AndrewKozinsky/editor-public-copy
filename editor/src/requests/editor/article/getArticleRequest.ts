import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import FilesTreeType from 'types/filesTree'


/** Функция получает данные статьи */
export default async function getArticleRequest(articleUuid: FilesTreeType.UuId) {

    const options = { method: 'GET' }
    const response: GetArticleRequestServerResponse = await makeFetch(
        getApiUrl('article', articleUuid), options
    )

    return response
}

// Тип данных с ответом от пользователя
type GetArticleRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        article: null | ArticleDataType
    }
}

export type ArticleDataType = {
    uuid: string // "7debef2a-327c-413e-994d-aa75b32ff596"
    siteId: string // "60c6e368fd09180020febc9a"
    name: string // "New article"
    code: null | string
    incFilesTemplateId?: null | string
}
