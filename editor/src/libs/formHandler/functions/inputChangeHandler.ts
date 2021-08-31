import React from 'react'
import FHTypes from '../types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import { setServiceDataToField } from './useSetServiceDataToForm'

/**
 * Обработчик изменения поля формы
 * @param {Object} e — объект события
 * @param {Object} formState — Состояние формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 */
export default function inputChangeHandler(
    e: React.BaseSyntheticEvent,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Данные поля из Состояния
    const inputData = formState.fields[e.target.name]

    let inputDataCopy = {...inputData}
    // Если в данных поля в типе стоит unknown, то данные неполные. Поставить служебную информацию:
    // ссылки на элемент, его тип и количество возможных значений
    if (inputDataCopy.fieldType === 'unknown') {
        inputDataCopy = setServiceDataToField(formState, e.target.name)
    }

    // Значение поля
    const inputValue = e.target.value

    // Получение и установка нового значения поля
    inputDataCopy.value = getNewValue(inputDataCopy, inputValue)

    // Получение и установка нового Состояния формы
    let newState: FHTypes.FormState = makeImmutableObj(formState, inputData, inputDataCopy)
    setFormState(newState)
}

/**
 * Функция получает новое значение поля и в зависимости от типа поля возвращает новый массив значений поля
 * @param {Object} inputData — данные поля
 * @param {String} newValue — новое значение поля
 */
function getNewValue(inputData: FHTypes.FieldStateObj, newValue: string) {
    if (inputData.valueCount === 'zero') {
        return ['']
    }
    else if (inputData.valueCount === 'one') {
        return [newValue]
    }
    else {
        // Существует ли переданное значение в массиве значений?
        const isPassedValueExists = !!(inputData.value.find(val => val === newValue))

        // Если сущуствует, то удалить, если нет, то добавить переданное значение
        let valuesNewArr = [...inputData.value]
        if (isPassedValueExists) {
            valuesNewArr = valuesNewArr.filter(val => val !== newValue)
        } else {
            valuesNewArr.push(newValue)
        }

        return valuesNewArr
    }
}
