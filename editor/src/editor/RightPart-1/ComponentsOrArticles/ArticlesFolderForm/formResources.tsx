// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'libs/formHandler/types'
import { store } from 'store/rootReducer'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'
import putArticlesFoldersRequest from 'requests/editor/article/putArticlesFoldersRequest'
import {
    articlesTreeStore,
    setArtItems
} from '../stores'


/** Объект настройки useFormHandler */
export default function getFormConfig(): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            name: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(
                            formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                        )
                    }
                },
            },
            submit: {
                initialValue: [''],
                initialData: {
                    loading: false,
                    disabled: false,
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(
                    formDetails.state,
                    formDetails.setFieldDataPropValue,
                    formDetails.setFormDataPropValue
                )

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(
                    formState, 'submitCounter', formState.form.data.submitCounter + 1
                )

                // Первое поле, где есть ошибка
                let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, true)


                // Если поля формы заполнены неверно...
                if($firstWrongField) {
                    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                    formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(formState, 'disabled', true, 'submit')

                    // Поставить фокус на первое поле где есть ошибка
                    $firstWrongField.focus()

                    // Поставить новое Состояние формы
                    formDetails.setFormState(formState)

                    // Завершить дальнейшее выполнение
                    return
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
                formDetails.setFormState(newFormState)

                // Сохранить папки с компонентами на сервере и обновить их Состояние
                saveItemsOnServer(formDetails)
            }
        }
    }
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 */
function getSchema(fieldName: string): any {
    const schemas = {
        name: yup.string().required(articleFolderFormMessages.formNameInputRequired)
    }

    // @ts-ignore
    return schemas[fieldName]
}


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 */
function validateForm(
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
): FHTypes.FormState {

    // Правильно ли заполнена форма
    let isFormValid = true

    // Проверка всех полей формы
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        // Игнорировать кнопки
        if (field.fieldType === 'button') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            getSchema(fieldName)?.validateSync(fieldValue)
            formState = setFieldDataPropValue(formState, 'error', null, fieldName)
        } catch (err) {
            isFormValid = false
            formState = setFieldDataPropValue(formState, 'error', err.message, fieldName)
        }
    }

    // Если поля формы заполнены верно...
    if(isFormValid) {
        // Разблокировать кнопку отправки
        return setFieldDataPropValue(formState, 'disabled', false, 'submit')
    }
    // Если в форме допущены ошибки...
    else {
        // Заблокировать кнопку отправки
        return setFieldDataPropValue(formState, 'disabled', true, 'submit')
    }
}


/**
 * Функция возвращает ссылку на элемент первого поля с ошибкой
 * @param {Object} formState — объект с Состоянием формы
 */
function getFirstInvalidField(formState: FHTypes.FormState) {

    // Первое поле, где есть ошибка
    let $firstWrongField: null | HTMLInputElement = null

    // Перебор всех полей чтобы найти поле с первой ошибкой
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        if (field.data.error) {
            $firstWrongField = field.$field
            break
        }
    }

    return $firstWrongField
}


/**
 * Функция ставит блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'name')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}


/**
 * Функция сохраняет папки со статьями на сервере и обновляет их Состояние
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
async function saveItemsOnServer(formDetails: FHTypes.FormDetailsInSubmitHandler ) {

    // Массив папок и файлов из Хранилища
    const items = articlesTreeStore.getState()

    // id выбранной папки
    const {currentArtItemId} = store.getState().sites.articlesSection

    // Изменить название папки на введённое и обновить Хранилище папок
    const folderName = formDetails.state.fields.name.value[0]
    const result  = filesTreePublicMethods.changeItemName(
        items, currentArtItemId, folderName
    )
    setArtItems(result.newItems)

    // Подготовить массив папок и файлов для сохранения на сервере
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)

    // Сохранить данные на сервере
    await putArticlesFoldersRequest(preparedItems)
}
