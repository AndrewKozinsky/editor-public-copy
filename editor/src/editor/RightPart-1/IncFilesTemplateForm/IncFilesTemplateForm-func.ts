import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import {incFilesTemplateSectionMessages} from 'messages/incFilesTemplateSectionMessages'
import {ButtonIconType} from 'common/formElements/Button/Button'


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherTemplate(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // id текущего шаблона и массив шаблонов
    const {currentTemplateId, templates} = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)

    useEffect(function () {
        // Найти шаблон с указанным id
        const template = templates.find((template: StoreSitesTypes.IncFilesTemplateType) => {
            return template.id === currentTemplateId
        })

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', template)
        newFormState = changeField(newFormState, 'head', template)
        newFormState = changeField(newFormState, 'body', template)

        // В данные формы поставить актуальный тип формы чтобы знать назначение формы:
        // createTemplate если хотят создать новый шаблон
        // или saveTemplate если хотят сохранить новые данные шаблона
        const newFormData = {
            ...formState.form.data,
            formType: template ? 'saveTemplate' : 'createTemplate'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentTemplateId, templates])
}

/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} template — данные о шаблоне
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'head' | 'body',
    template: null | StoreSitesTypes.IncFilesTemplateType
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Занесение нового значения. Если в template ничего, то поставить пустое значение.
    const val = template ? template[fieldName] : ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


/** Функция возвращает текст на кнопке отправки в зависимости от того выделены ли новый шаблон или существующий */
export function useGetSubmitButtonText() {
    // id текущего шаблона
    const {currentTemplateId} = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)
    const [submitName, setSubmitName] = useState('')
    const [submitIconType, setSubmitIconType] = useState<ButtonIconType>('btnSignAdd')

    // Если выделели новый шаблон
    useEffect(function () {
        if (!currentTemplateId) {
            setSubmitName(incFilesTemplateSectionMessages.submitBtnTextNewSite)
            // На кнопке отправки поставить значёк Плюс.
            setSubmitIconType('btnSignAdd')
        } else {
            setSubmitName(incFilesTemplateSectionMessages.submitBtnTextSave)
            // На кнопке отправки поставить значёк Сохранения.
            setSubmitIconType('btnSignSave')
        }
    }, [currentTemplateId])

    return { submitName, submitIconType }
}
