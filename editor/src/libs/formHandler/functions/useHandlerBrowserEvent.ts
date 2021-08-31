import FHTypes from '../types'
import {
    getSetFieldData,
    getSetFieldDataPropValue,
    getSetFieldValue,
    setFormData,
    setFormDataPropValue
} from './formStateSettersAndGetters'


/**
 * Функция запускаемая после браузерного события
 * @param {Object} browserEvent — объект с данными о произошедшем событии
 * @param {Object} formConfig — outer configure object
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 * @param {Function} setBrowserEvent — установка
 */
export function handleBrowserEvent(
    browserEvent: FHTypes.BrowserEventState,
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setBrowserEvent: (browserEvent: FHTypes.BrowserEventState) => void
) {
    // Имя поля и имя произошедшего события
    const {fieldName, eventName} = browserEvent

    // Не обрабатывать пустые события
    if (!eventName || !fieldName) return

    // Если в formConfig у поля есть обработка определённого события...
    if (formConfig.fields[fieldName] && formConfig.fields[fieldName][eventName]) {
        // Объект передаваемый в функцию устанавливающую данные поля
        const formDetails = getFormDetails(browserEvent, formState, fieldName)

        // Запуск функции, которая должна запускаться после определённого события
        // случившегося на поле. Возвращает новый объект Состояния формы
        const newFormState = formConfig.fields[fieldName][eventName](formDetails)

        // Установка нового состояния формы
        if (newFormState) setFormState(newFormState)
    }

    // Обнулить событие чтобы в случае повторного возникновения события
    // с таким же именем сработал бы обработчик
    // setTimeout прописан потому что без него не работают флаги и переключатели
    setTimeout(() => {
        setBrowserEvent({browserEvent: null, eventName: null})
    }, 0)
}

/**
 * Функция возращает объект, который передаётся в пользовательский обработчик браузерного события
 * @param {Object} browserEvent — данные о событии
 * @param {Object} formState — объект События формы
 * @param {String} fieldName — имя поля где призошло событие
 */
export function getFormDetails(
    browserEvent: null | FHTypes.BrowserEventState,
    formState: FHTypes.FormState,
    fieldName: string
): FHTypes.FormDetailsInEventHandler {
    return {
        // Объект события
        browserEvent: browserEvent?.browserEvent || null,
        // Состояние формы.
        state: formState,
        // Функция изменяющая значение поля с заданным именем.
        setFieldValue: getSetFieldValue(fieldName),
        // Функция изменяющая данные поля с заданным именем и возвращающая обновлённое Состояние формы
        setFieldData: getSetFieldData(fieldName),
        // Функция изменяющая свойство в данных заданного поля
        setFieldDataPropValue: getSetFieldDataPropValue(fieldName),
        // Функция изменяющая данные формы и возвращающая обновлённое Состояние формы
        setFormData: setFormData,
        // Функция изменяющая свойство в данных формы
        setFormDataPropValue: setFormDataPropValue,
    }
}
