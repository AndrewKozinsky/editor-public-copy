// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'libs/formHandler/types'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import createSiteRequest from 'src/requests/editor/sites/createSiteRequest'
import updateSiteRequest from 'src/requests/editor/sites/updateSiteRequest'


// Объект настройки useFormHandler
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
                        return validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue)
                    }
                },
            },
            defaultIncFilesTemplateId: {
                initialValue: [''],
            },
            submit: {
                initialValue: [''],
                initialData: {
                    loading: false,
                    disabled: false
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
                // Тип формы: createSite (создать новый сайт) или saveSite (сохранить новое имя сайта)
                formType: 'createSite'
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

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

                // В зависимости от типа формы запущу разные функции сохранения данных
                // Если нужно создать новый сайт
                if (formDetails.state.form.data.formType === 'createSite') {
                    await createNewSite(formDetails)
                }
                // Если нужно обновить данные сайта
                else {
                    await updateSite(formDetails)
                }
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
        name: yup.string().required(siteSectionMessages.siteNameInputRequired)
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

        // Игнорировать кнопки и выпадающие списки
        if (field.fieldType === 'button' || field.fieldType === 'select') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            getSchema(fieldName).validateSync(fieldValue)
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
 * Функция создающая новый сайт
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
async function createNewSite(formDetails: FHTypes.FormDetailsInSubmitHandler) {
    // Отправить данные на сервер...
    const response = await createSiteRequest(formDetails.readyFieldValues.name.toString())

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
    formDetails.setFormState(newFormState)

    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(actions.sites.requestSites())

        // Найти в Хранилище сайт с таким же именем и выделить его
        const newSite = store.getState().sites.sites.find((site: any) => site.id === response.data.site.id)

        store.dispatch(actions.sites.setCurrentSiteId(newSite.id))
    }
}


/**
 * Функция редактирующая данные существующего сайта
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
async function updateSite(formDetails: FHTypes.FormDetailsInSubmitHandler) {

    // id и имя выбранного сайта
    const siteId = store.getState().sites.currentSiteId
    const name = formDetails.readyFieldValues.name.toString()

    // Шаблон подключаемых файлов
    let incFilesTemplateId = null
    if (formDetails.readyFieldValues.defaultIncFilesTemplateId) {
        incFilesTemplateId = formDetails.readyFieldValues.defaultIncFilesTemplateId.toString()
    }

    const response = await updateSiteRequest(siteId, name, incFilesTemplateId)

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
    formDetails.setFormState(newFormState)

    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(actions.sites.requestSites())
    }
}
