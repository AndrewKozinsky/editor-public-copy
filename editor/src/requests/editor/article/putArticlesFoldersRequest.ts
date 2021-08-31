import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import { store } from 'src/store/rootReducer'
import FilesTreeType from '../../../types/filesTree'

/**
 * Функция обновляет данные по папкам статей
 * @param {Array} items — массив папок со статьями
 */
export default async function putArticlesFoldersRequest(items: FilesTreeType.Items) {
    // id выбранного сайта
    const siteId = store.getState().sites.currentSiteId

    const jsonItems = JSON.stringify(items)

    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    const response: PutComponentsFoldersServerResponse = await makeFetch(
        getApiUrl('articlesFolders', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type PutComponentsFoldersServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        folders: {
            content: string // "[{\"uuid\":\"a93df62a-c4c9-4813-be54-43fcd7602573\",\"type\":\"file\"}...]"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
        }
    }
}
