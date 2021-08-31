import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция обновляет существующий шаблон подключаемых файлов
 * @param {Object} values — новые данные шаблона подключаемых файлов
 * @param {String} siteId — site id
 * @param {String} templateId — id шаблона подключаемых файлов
 */
export default async function updateIncFilesTemplateRequest(values: UpdateTemplateValuesType, siteId: string, templateId: string) {
    const templateData = {
        name: values.name,
        codeInHead: {
            code: values.headCode
        },
        codeBeforeEndBody: {
            code: values.bodyCode
        },
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(templateData)
    }
    const response: UpdateTemplateRequestServerResponse = await makeFetch(
        getApiUrl('incFiles', siteId, templateId), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type UpdateTemplateValuesType = {
    name: string,
    headCode: null | string,
    bodyCode: null | string
}

// Тип данных с ответом от пользователя
type UpdateTemplateRequestServerResponse = ErrorServerResponseType | SuccessResponse



// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        template: {
            _id: string // "60c9b2438e886a003b669911"
            userId: string //"60c626f9fd09180020febc99"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            name: string // "Шаблон"
            codeBeforeEndBody: {
                code: null | string // "</body>"
            }
            codeInHead: {
                code: null | string // "<head>"
            }
        }
    }
}
