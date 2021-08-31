import {useSelector} from 'react-redux'
import {AppStateType} from 'src/store/rootReducer'
import {makeFetch, useFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'


// Функция удаляет сайт
// I DON'T WANT TO USE REQUEST FUNCTIONS WITH SIDE EFFECTS
export function useGetComponentsFoldersRequest() {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // Параметры запроса
    const options = { method: 'GET'}

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {data: componentsResponse, doFetch: doComponentsFetch} =
        useFetch<GetComponentsFoldersServerResponse>(getApiUrl('componentsFolders', currentSiteId), options)

    return {
        componentsResponse,
        doComponentsFetch
    }
}

export async function getComponentsFoldersRequest(siteId: string) {
    const options = { method: 'GET'}

    const response: GetComponentsFoldersServerResponse = await makeFetch(
        getApiUrl('componentsFolders', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
export type GetComponentsFoldersServerResponse = null | ErrorServerResponseType | SuccessResponse


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
