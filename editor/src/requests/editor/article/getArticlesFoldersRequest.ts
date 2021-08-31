import {useSelector} from 'react-redux'
import {AppStateType} from 'src/store/rootReducer'
import { useFetch } from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'


// Функция удаляет сайт
export function useGetArticlesFoldersRequest() {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // Параметры запроса
    const options = { method: 'GET'}

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {data: articlesResponse, doFetch: doArticlesFetch} =
        useFetch<GetArticlesFoldersServerResponse>(getApiUrl('articlesFolders', currentSiteId), options)

    return {
        articlesResponse,
        doArticlesFetch
    }
}


// Тип данных с ответом от пользователя
export type GetArticlesFoldersServerResponse = null | ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        folders: {
            content: string // "[{\"uuid\":\"1\",\"type\":\"folder\",\"name\":\"New folder\"}...]"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
        }
    }
}
