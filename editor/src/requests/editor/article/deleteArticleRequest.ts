import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import StoreSitesTypes from 'src/store/site/sitesTypes'

/** Функция удаляет статью выделенную в списке всех статей */
export default async function deleteArticleRequest(currentArtItemId: StoreSitesTypes.CurrentArtItemId) {

    const options = { method: 'DELETE' }
    const response: DeleteArticleRequestServerResponse = await makeFetch(
        getApiUrl('article', currentArtItemId), options
    )

    return response
}

// Тип данных с ответом от пользователя
// type DeleteArticleRequestServerResponse = ErrorServerResponseType | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
}
