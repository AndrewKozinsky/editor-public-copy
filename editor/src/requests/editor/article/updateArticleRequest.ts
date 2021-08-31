import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ArticleTypes from 'store/article/codeType/articleCodeType'


/**
 * Функция сохраняет имя статьи и id шаблона подключаемых файлов этой статьи
 * @param {String} articleId — uuid сохраняемой статьи
 * @param {String} name — название статьи
 * @param {String} incFilesTemplateId — id шаблона подключаемых файлов
 */
export async function updateArticleNameRequest(
    articleId: string, name: string, incFilesTemplateId: null | string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            incFilesTemplateId
        })
    }
    const response: UpdateSiteRequestServerResponse = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}

/**
 * Функция сохраняет код статьи
 * @param {String} articleId — uuid сохраняемой статьи
 * @param {String} articleCode — код статьи
 */
export async function updateArticleCodeRequest(
    articleId: string, articleCode: ArticleTypes.Article
) {
    const articleCodeStr = JSON.stringify(articleCode)

    const options = {
        method: 'PATCH',
        body: JSON.stringify({code: articleCodeStr})
    }
    const response: UpdateSiteRequestServerResponse = await makeFetch(
        getApiUrl('article', articleId), options
    )
    return response
}


// Тип данных с ответом от пользователя
type UpdateSiteRequestServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        article: {
            code: null | string
            incFilesTemplateId: null | string
            name: string // "New article 2"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
            uuid: string // "a93df62a-c4c9-4813-be54-43fcd7602573"
        }
    }
}
