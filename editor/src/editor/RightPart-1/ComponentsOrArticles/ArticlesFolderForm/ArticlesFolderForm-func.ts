import {useEffect} from 'react'
import {useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import { AppStateType } from 'store/rootReducer'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import {articlesTreeStore} from '../stores'


/**
 * Хук отслеживает выделение другой папки со статями и изменяет форму чтобы отражать данные выделенной папки
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherFolderData(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // Массив папок и файлов из Хранилища
    const articlesItems = useStore(articlesTreeStore)

    // id текущей папки у статей
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    useEffect(function () {
        setNewFolderName(articlesItems, currentArtItemId, formState, setFormState)
    }, [currentArtItemId, articlesItems])
}

/**
 * Функция получает название выделенной папки и ставит её в поле name у формы.
 * Поэтому при выборе какой-либо папки в форме меняется её имя.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} currentItemId — uuid выделенной папки
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 */
function setNewFolderName(
    items: DragFilesTreeType.Items,
    currentItemId: DragFilesTreeType.UuId,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    if (!items || !currentItemId) return

    // Найти папку с указанным uuid в массиве папок и файлов
    const folder = filesTreePublicMethods.getItemById(items, currentItemId)

    // Поставить новые значения в поля...
    let newFormState = changeField(formState, 'name', folder)

    // Поставить новое состояние формы
    setFormState(newFormState)
}


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} folder — данные о папке
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name',
    folder: DragFilesTreeType.Item
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Установка значения
    newField.value = [folder[fieldName]]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}
