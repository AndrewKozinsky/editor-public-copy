import {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import { AppStateType } from 'store/rootReducer'
import actions from 'store/rootAction'
import StoreSitesTypes from 'store/site/sitesTypes'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import { store } from 'store/rootReducer'


/**
 * Хук отслеживает выделение другой статьи и изменяет форму чтобы отражать её данные
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherArticle(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    const dispatch = useDispatch()

    // Все статьи и id текущего сайта
    const sites: StoreSitesTypes.SitesType = useSelector((store: AppStateType) => store.sites.sites)
    const currentSiteId = useSelector((store: AppStateType) => store.sites.currentSiteId)
    // Текущий сайт
    const currentSite = sites.find(s => s.id === currentSiteId)

    // id текущей статьи
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    // Данные статьи
    const {articlesSection} = useSelector((store: AppStateType) => store.sites)

    // При выделении другой статьи...
    useEffect(function () {
        // Сделать запрос на данные статьи и поставить в Хранилище
        dispatch( actions.sites.requestArticle() )
    }, [currentArtItemId])

    // При получении новых данных статьи поставить их в форму
    useEffect(function () {
        // Поставить имя
        let newFormState = changeField(formState, 'name', articlesSection.currentArtName)

        // Если в данных статьи есть id шаблона файлов, то поставить его в качестве значения в выпадающем списке.
        if (articlesSection.incFilesTemplateId) {
            newFormState = changeField(newFormState, 'incFilesTemplateId', articlesSection.incFilesTemplateId)
        }
        // Если шаблона нет, то поставить id шаблона по умолчанию
        else if (currentSite && currentSite.defaultIncFilesTemplateId) {
            newFormState = changeField(newFormState, 'incFilesTemplateId', currentSite.defaultIncFilesTemplateId)
        }
        // В остальных случаях ничего не ставить
        else {
            newFormState = changeField(newFormState, 'incFilesTemplateId', '')
        }

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [sites, currentArtItemId, articlesSection])
}


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} value — новое значение поля
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'incFilesTemplateId',
    value: null | string
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null

    // Занесение нового значения.
    const val = value || ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


/**
 * Хук контролирует выпадающий список выбора шаблона подключаемых файлов статьи.
 * Возвращает объект со свойствами:
 * showSelect — показывать ли выпадающий список со списком шаблонов,
 * один из которых можно указать в качестве шаблона по умолчанию для всего сайта.
 * selectOptions — массив пунктов выпадающего списка
 */
export function useManageTemplatesSelect(fh: FHTypes.ReturnObj) {
    // Массив шаблонов подключаемых файлов
    const templates:StoreSitesTypes.IncFilesTemplatesType = useSelector((store: AppStateType) => {
        return store.sites.incFilesTemplatesSection.templates
    })

    // Видим ли выпадающий список подключаемых файлов
    const [isSelectVisible, setIsSelectVisible] = useState(false)
    // Пункты выпадающего списка
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(function () {
        // Если есть массив шаблонов...
        if (templates?.length) {

            // Формирование массива пунктов выпадающего списка
            const options: OptionsType = templates.map(template => {
                return {
                    value: template.id,
                    label: template.name
                }
            })
            // Вставка пункта без значения
            options.unshift({
                value: 'none',
                label: siteSectionMessages.defaultTemplateSelectNoValue
            })

            // Установка пунктов выпадающего списка
            setSelectOptions(options)

            // Сделать <select> видимым
            setIsSelectVisible(true)
        }
        // Если нет массива шаблонов...
        else {
            // Скрыть <select>
            setIsSelectVisible(false)

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
        isSelectVisible,
        selectOptions
    }
}

// Hook returns edit Article button onClick handler
export function useGetEditArticleBtnHandler() {
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)
    const {currentTemplateId} = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    return useCallback(function () {
        store.dispatch(actions.article.fillArticle(
            currentSiteId, currentTemplateId, currentArtItemId
        ))
    }, [currentSiteId, currentTemplateId, currentArtItemId])
}
