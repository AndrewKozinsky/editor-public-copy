import {useEffect, useState} from 'react'
import FHTypes from '../types'
import {
    getSetFieldData,
    getSetFieldDataPropValue,
    getSetFieldValue,
    setFormData,
    setFormDataPropValue
} from './formStateSettersAndGetters'


/**
 * Обработчик отправки формы
 * @param {Object} formConfig — outer configure object
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 */
export default function useSubmitForm(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Можно ли запустить обработку отправки формы?
    const [canRunSubmitHandler, setCanRunSubmitHandler] = useState(false)

    // При изменения значения можно ли запускать отправку формы
    useEffect(function () {
        if (!canRunSubmitHandler) return
        // Запретить отправку формы
        setCanRunSubmitHandler(false)

        // Объект передаваемый в обработчик отправки формы
        const submitFormDetails = getSubmitFormDetails(formState, setFormState)

        // Запустить пользовательскую функцию отправки формы
        formConfig.form.submit(submitFormDetails)
    }, [canRunSubmitHandler])

    return setCanRunSubmitHandler
}


export function getSubmitFormDetails(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
): FHTypes.FormDetailsInSubmitHandler {
    return {
        // Состояние формы.
        state: formState,
        // Функция устанавливающая новое Состояние формы
        setFormState: setFormState,
        // Функция устанавливающая новое значение поля
        setFieldValue: getSetFieldValue(),
        // Функция устанавливающая новые данные поля с заданным именем.
        setFieldData: getSetFieldData(),
        // Функция устанавливающая значение свойства в данных поля
        setFieldDataPropValue: getSetFieldDataPropValue(),
        // Функция изменяющая данные формы.
        setFormData: setFormData,
        // Функция изменяющая данные формы.
        setFormDataPropValue: setFormDataPropValue,
        // Значения полей для отправки на сервер
        readyFieldValues: getReadyFieldsValues(formState)
    }
}


/**
 * Функция подготавливает объект со значениями полей для отправки на сервер
 * @param {Object} formState — объект Состояния формы
 */
function getReadyFieldsValues(formState: FHTypes.FormState): FHTypes.ReadyFieldsValues {
    let fieldsValuesSubmitObj: FHTypes.ReadyFieldsValues = {}

    for (let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        if (field.fieldType === 'unknown') {
            fieldsValuesSubmitObj[fieldName] = null
        }
        else if (field.valueCount === 'one') {
            fieldsValuesSubmitObj[fieldName] = field.value[0]
        }
        else if (field.valueCount === 'many') {
            fieldsValuesSubmitObj[fieldName] = field.value
        }
    }

    return fieldsValuesSubmitObj
}
