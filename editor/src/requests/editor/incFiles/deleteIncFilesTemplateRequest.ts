import {useFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'

// Функция удаляет шаблон подключаемых файлов
export function useDeleteIncFilesTemplate() {

    // id выделенного шаблона, который нужно удалить
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const { currentTemplateId } = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteIncFilesTemplateServerResponse>(
            getApiUrl('incFiles', currentSiteId, currentTemplateId), options
        )

    return { response, doFetch }
}

// Тип данных с ответом от пользователя
type DeleteIncFilesTemplateServerResponse = null | ErrorServerResponseType | SuccessResponse



// Успешный ответ
type SuccessResponse = {
    status: "success"
}
