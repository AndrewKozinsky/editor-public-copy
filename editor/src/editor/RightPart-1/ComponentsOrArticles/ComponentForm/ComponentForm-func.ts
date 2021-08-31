import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import { AppStateType } from 'store/rootReducer'
import actions from 'store/rootAction'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'


/**
 * Хук отслеживает выделение компонента изменяет форму чтобы отражать выделенный компонент
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherComponent(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    const dispatch = useDispatch()

    // id текущего шаблона компонента
    const {currentCompItemId} = useSelector((store: AppStateType) => store.sites.componentsSection)

    // Данные статьи
    const {componentsSection} = useSelector((store: AppStateType) => store.sites)

    // При выделении другого компонента скачать его данные и поставить в Хранилище
    useEffect(function () {
        // Сделать запрос на данные шаблона компонента и поставить в Хранилище
        dispatch( actions.sites.requestComponentTemplate() )
    }, [currentCompItemId])

    // При изменении uuid или кода шаблона компонента поставить в форму новые данные
    useEffect(function () {
        // Поставить имя
        let newFormState = changeField(formState, 'name', componentsSection.currentCompName)
        // Поставить код
        newFormState = changeField(newFormState, 'code', componentsSection.currentCompCode)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentCompItemId, componentsSection])
}


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} value — новое значение поля
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'code',
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
