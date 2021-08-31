import { store } from 'src/store/rootReducer'
import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import FilesTreeType from '../../../types/filesTree'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Array} items — массив папок с компонентами
 */
export default async function putComponentsFoldersRequest(items: FilesTreeType.Items) {
    // id выбранного сайта
    const siteId = store.getState().sites.currentSiteId

    const jsonItems = JSON.stringify(items)

    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    const response: PutComponentsFoldersServerResponse = await makeFetch(
        getApiUrl('componentsFolders', siteId), options
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
            content: string // "[{\"uuid\":\"3\",\"type\":\"folder\",\"name\":\"New folder\"}...]"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
        }
    }
}
