import { useEffect, useState } from 'react'
import FHTypes from '../types'
import { getFormDetails } from './useHandlerBrowserEvent'
import { getSubmitFormDetails } from './useSubmitForm'


/**
 * Обработчик изменения Состояния формы. Он запускает обработчики этого события описанные в полях
 * @param {Object} formConfig — outer configure object
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 */
export default function useStateChangeHandler(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
) {
    // Можно ли запускать обработчик изменения объекта состояния
    const [canRunStateChangeHandler, setCanRunStateChangeHandler] = useState(true)

    // При изменении Состояния формы
    useEffect(() => {
        // Ничего не делать если нельзя запустить обработчик изменения объекта Состояния
        if (!canRunStateChangeHandler) return

        // Запретить вызов обработчика изменения Состояния чтобы не получилось циклического изменения состояния
        setCanRunStateChangeHandler(false)
        // Позволить вызов обработчика изменения Состояния через некоторое время
        setTimeout(() => {setCanRunStateChangeHandler(true)}, 50)

        // Запустить функции обрабатывающие событие stateChange, описанные в полях
        stateChangeHandler(formConfig, formState, setFormState, setCanRunStateChangeHandler)
    }, [formState])
}

/**
 * Функция запускаемая при изменении Состояния формы
 * @param {Object} formConfig — outer configure object
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 * @param {Function} setCanRunStateChangeHandler — функция устанавливающая можно ли запускать обработчик изменения Состояния
 */
function stateChangeHandler(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setCanRunStateChangeHandler: (arg: boolean) => void
) {
    // Перебрать поля объекта Состояния
    for (let fieldName in formConfig.fields) {
        // Текущее поле
        const field = formConfig.fields[fieldName]

        // Если в поле есть подписка на событие изменения Состояния формы
        if (field.statechange) {

            // Объект передаваемый в функцию-обработчик обновления Состояния формы
            const formDetails = getFormDetails(null, formState, fieldName)

            // Запуск функции, которая должна запускаться после обновления Состояния формы
            const newFormState = field.statechange(formDetails)

            // Установка нового состояния формы
            setFormState(newFormState)
        }
    }

    // Запустить метод stateChange объекта конфигурации у формы (если он есть)
    if (formConfig.form.stateChange) {
        // Объект передаваемый в обработчик изменения Состояния формы
        const formDetails = getSubmitFormDetails(formState, setFormState)

        // Запуск обработчика изменения состояния формы
        formConfig.form.stateChange(formDetails)
    }
}
