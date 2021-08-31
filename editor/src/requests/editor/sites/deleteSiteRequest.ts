import {useFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import { useSelector } from 'react-redux'
import { AppStateType } from 'src/store/rootReducer'


// Функция удаляет сайт
export function useDeleteSite() {

    // id выделенного сайта, который нужно удалить
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteSiteServerResponse>(getApiUrl('site', currentSiteId), options)

    return { response, doFetch }
}


// Тип данных с ответом от пользователя
type DeleteSiteServerResponse = null | ErrorServerResponseType | SuccessResponse



// Успешный ответ
type SuccessResponse = {
    status: "success"
}
