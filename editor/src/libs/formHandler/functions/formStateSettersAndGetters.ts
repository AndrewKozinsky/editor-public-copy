import FHTypes from '../types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'

/**
 * Функция возвращающая функцию ставящая в объект Состояния формы новое значение поля
 * Возвращает объект Состояния формы
 * @param {Object} defaultFieldName — имя изменяемого поля
 */
export function getSetFieldValue(defaultFieldName?: string) {
    // В formState — состояние формы
    // В fieldValue — новое значение поля
    // В fieldName — имя изменяемого поля
    return function (formState: FHTypes.FormState, fieldValue: FHTypes.FieldValue, fieldName?: string) {
        const field = formState.fields[fieldName || defaultFieldName]
        const newField = {...field, value: fieldValue}

        return <FHTypes.FormState>makeImmutableObj(formState, field, newField)
    }
}

/**
 * Функция возращает функцию изменяющая данные поля (все свойства)
 * Возвращает объект Состояния формы
 * @param {Object} defaultFieldName — имя изменяемого поля
 */
export function getSetFieldData(defaultFieldName?: string) {
    // В formState — состояние формы
    // В fieldData — новые данные поля
    // В fieldName — имя изменяемого поля
    return function (formState: FHTypes.FormState, fieldData: FHTypes.AnyData, fieldName?: string) {
        const field = formState.fields[fieldName || defaultFieldName]
        const newField = {...field, data: fieldData}

        return <FHTypes.FormState>makeImmutableObj(formState, field, newField);
    }
}

/**
 * Функция возращает функцию изменяющая свойство в данных заданного поля
 * Возвращает объект Состояния формы
 * @param {Object} defaultFieldName — имя изменяемого поля
 */
export function getSetFieldDataPropValue(defaultFieldName?: string) {
    // В formState — состояние формы
    // В dataPropName — имя свойства в данных поля
    // В dataPropValue — значение свойства в данных поля
    // В fieldName — имя поля, в котором нужно поменять значение свойстве в данных
    return function (
        formState: FHTypes.FormState,
        dataPropName: string,
        dataPropValue: FHTypes.AnyData,
        fieldName?: string
    ) {
        const field = formState.fields[fieldName || defaultFieldName]
        const newField = {
            ...field,
            data: {
                ...field.data,
                [dataPropName]: dataPropValue
            }
        }

        return <FHTypes.FormState>makeImmutableObj(formState, field, newField)
    }
}

/**
 * Функция ставящая в объект Состояния формы данные формы
 * Возвращает объект Состояния формы
 * @param {Object} formState — объект Состояния формы
 * @param {Object} newData — устанавливаемые данные поля
 */
export function setFormData(formState: FHTypes.FormState, newData: FHTypes.AnyData) {
    const form = formState.form
    const newForm = {...form, data: newData}

    return <FHTypes.FormState>makeImmutableObj(formState, form, newForm)
}

/**
 * Функция изменяющая значение свойства в объекте данных формы
 * @param {Object} formState — объект Состояния формы
 * @param {String} dataPropName — имя свойства в данных формы
 * @param {*} dataPropValue — значение свойства в данных формы
 */
export function setFormDataPropValue(
    formState: FHTypes.FormState,
    dataPropName: string,
    dataPropValue: FHTypes.AnyData,
) {
    const form = formState.form
    const newForm = {
        ...form,
        data: {
            ...form.data,
            [dataPropName]: dataPropValue
        }
    }

    return <FHTypes.FormState>makeImmutableObj(formState, form, newForm)
}
