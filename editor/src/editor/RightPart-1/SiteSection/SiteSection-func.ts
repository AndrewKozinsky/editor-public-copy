import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import FHTypes from 'libs/formHandler/types'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import { ButtonIconType } from 'common/formElements/Button/Button'
import { OptionsType } from 'common/formElements/Select/SelectTypes'


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherSite(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // id текущего сайта и массив сайтов
    const {currentSiteId, sites} = useSelector((store: AppStateType) => store.sites)

    useEffect(function () {
        if (!sites.length) return

        // Найти сайт с указанным id
        let site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

        if (!site) site = { id: null, name: '', defaultIncFilesTemplateId: null }

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', site)
        newFormState = changeField(newFormState, 'defaultIncFilesTemplateId', site)

        // В данные формы поставить тип формы:
        // createSite если хотят создать новый сайт
        // или saveSite если хотят сохранить данные существующего сайта
        const newFormData = {
            ...formState.form.data,
            formType: site.name ? 'saveSite' : 'createSite'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentSiteId, sites])
}


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} site — данные о сайте
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'defaultIncFilesTemplateId',
    site: null | StoreSitesTypes.SiteType
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Занесение нового значения. Если в site ничего, то поставить пустое значение.
    const val = site ? site[fieldName] : ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


/** Функция возвращает текст и тип значка на кнопке отправки формы */
export function useGetSubmitButtonText() {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const [submitName, setSubmitName] = useState('')
    const [submitIconType, setSubmitIconType] = useState<ButtonIconType>('btnSignAdd')

    useEffect(function () {
        // Если выделели новый сайт
        if (!currentSiteId) {
            setSubmitName(siteSectionMessages.submitBtnTextNewSite)
            // На кнопке отправки поставить значёк Плюс.
            setSubmitIconType('btnSignAdd')
        }
        // Если выделили существующий сайт.
        else {
            setSubmitName(siteSectionMessages.submitBtnTextSave)
            // На кнопке отправки поставить значёк Сохранения.
            setSubmitIconType('btnSignSave')
        }
    }, [currentSiteId])

    return { submitName, submitIconType }
}

/**
 * Функция возвращает булево значение нужно ли показывать кнопку удаления сайта.
 * Она видна только если выделен существующий сайт.
 */
export function useGetDeleteSiteVisibilityStatus() {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (!currentSiteId) setIsVisible(false)
        else setIsVisible(true)
    }, [currentSiteId])

    return isVisible
}

/**
 * Хук контролирует выпадающий список выбора шаблона по умолчанию для всего сайта.
 * Возвращает объект со свойствами:
 * showSelect — показывать ли выпадающий список со списком шаблонов,
 * один из которых можно указать в качестве шаблона по умолчанию для всего сайта.
 * selectOptions — массив пунктов выпадающего списка
 */
export function useManageTemplatesSelect(fh: FHTypes.ReturnObj) {

    // Массив шаблонов подключаемых файлов
    const templates:StoreSitesTypes.IncFilesTemplatesType  = useSelector((store: AppStateType) => {
        return store.sites.incFilesTemplatesSection.templates
    })

    const [isVisible, setIsVisible] = useState(false)
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(function () {
        // Если есть массив шаблонов...
        if (templates && templates.length) {

            // Формирование массива пунктов выпадающего списка
            const options: OptionsType = templates.map(template => {
                return {
                    value: template.id,
                    label: template.name
                }
            })
            options.unshift({
                value: 'none',
                label: siteSectionMessages.defaultTemplateSelectNoValue
            })

            // Установка пунктов выпадающего списка
            setSelectOptions(options)
            // Сделать <select> видимым
            setIsVisible(true)
        }
        // Если нет массива шаблонов...
        else {
            // Скрыть <select>
            setIsVisible(false)

            // Очистить значение выпадающего списка в обработчике форм
            const templatesField = fh.formState.fields.defaultTemplate
            const newTemplatesField = {
                ...templatesField,
                fieldValue: ['']
            }
            fh.setFormState = makeImmutableObj(fh.formState, templatesField, newTemplatesField)
        }
    }, [templates])

    return {
        isVisible,
        selectOptions
    }
}
