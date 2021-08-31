import React from 'react'

// Типы FormHandler
namespace FHTypes {

    // ОБЪЕКТ КОНФИГУРАЦИИ ------------------------------------------
    // Тип объекта конфигурации useFormHandler передаваемый пользователем
    export type FormConfig = {
        // Объект с данными по полям
        fields: {
            // Имя поля. Например email
            [key: string]: ConfigField
        },
        form: {
            // Изначальные данные формы. Например { submitCounter: 0 }
            initialData?: FieldData
            // Функция запускаемая при изменении Состояния формы
            // Например она требуется чтобы определись когда кнопка отправки должна быть заблокирована
            stateChange?: ConfigFormEventHandler
            // Пользовательская функция запускаемая при отправке формы когда все поля верные
            submit: ConfigFormEventHandler
        }
    }
    export type ConfigField = {
        // Изначальное значение поля. Например: ['andkozinsky@gmail.com'].
        initialValue?: FieldValue,
        // Изначальные данные поля. Например { error: null }
        initialData?: FieldData
        // Обработчики браузерных событий
        change?: ConfigFieldEventHandler
        focus?: ConfigFieldEventHandler
        blur?: ConfigFieldEventHandler
        click?: ConfigFieldEventHandler
        submit?: ConfigFieldEventHandler
        // Обработчик изменения Состояния формы
        statechange?: ConfigFieldEventHandler
    }

    // Обработчик события поля
    type ConfigFieldEventHandler = (formDetails: FormDetailsInEventHandler) => FormState
    // Обработчик события формы
    type ConfigFormEventHandler = (formDetails: FormDetailsInSubmitHandler) => void

    // Объект передаваемый в обработчик возникновения события поля и формы
    export type FormDetailsInEventHandler = {
        // Объект события браузера
        browserEvent: null | React.BaseSyntheticEvent,
        // Состояние формы.
        state: FormState
        // Функция изменяющая значение поля с заданным именем.
        setFieldValue: SetFieldValue
        // Функция изменяющая данные поля с заданным именем.
        setFieldData: SetFieldData
        // Функция изменяющая свойство в данных заданного поля
        setFieldDataPropValue: SetFieldDataPropValue
        // Функция изменяющая данные формы.
        setFormData: SetFormData
        // Функция изменяющая свойство в данных формы
        setFormDataPropValue: SetFormDataPropValue
    }

    // Функция изменяющая значение поля
    export type SetFieldValue = (
        formState: FormState,
        fieldValue: FieldValue,
        fieldName?: string
    ) => FormState

    // Функция изменяющая данные поля
    export type SetFieldData = (
        formState: FormState,
        fieldData: AnyData,
        fieldName?: string
    ) => FormState

    // Функция изменяющая свойство в данных заданного поля
    export type SetFieldDataPropValue = (
        formState: FormState,
        dataPropName: string,
        dataPropValue: AnyData,
        fieldName: string,
    ) => FormState

    // Функция изменяющая данные формы
    export type SetFormData = (
        formState: FormState,
        formData: AnyData,
    ) => FormState

    // Функция изменяющая свойство в данных формы
    export type SetFormDataPropValue = (
        formState: FormState,
        dataPropName: string,
        dataPropValue: AnyData
    ) => FormState

    // Установщик Состояния useFormHandler
    export type SetFormState = (formState: FormState) => void


    // Значение поля
    export type FieldValue = string[]
    // Данные поля или формы
    export type FieldData = {[key: string]: any}
    // Данные любого типа (для данных поля и формы)
    export type AnyData = any

    // Объект передаваемый в пользовательский обработчик отправки формы
    export type FormDetailsInSubmitHandler = {
        // Состояние формы.
        state: FormState
        // Функция устанавливающая новое Состояние формы
        setFormState: SetFormState
        // Функция устанавливающая новое значение поля
        setFieldValue: SetFieldValue
        // Функция устанавливающая новые данные поля с заданным именем.
        setFieldData: SetFieldData
        // Функция устанавливающая значение свойства в данных поля
        setFieldDataPropValue: SetFieldDataPropValue
        // Функция изменяющая данные формы.
        setFormData: SetFormData
        // Функция изменяющая данные формы.
        setFormDataPropValue: SetFormDataPropValue
        // Значения полей для отправки на сервер
        readyFieldValues: ReadyFieldsValues
    }
    // Значения полей для отправки на сервер
    export type ReadyFieldsValues = {
        // Имя поля. Например email
        [key: string]: string | string[]
    }


    // СОСТОЯНИЕ useFormHandler -------------------------------------
    export type FormState = {
        // Объект с данными по полям
        fields: FieldsStateObj
        form: FormStateObj
    }
    export type FieldsStateObj = {
        // Имя поля. Например email
        [key: string]: FieldStateObj
    }
    export type FieldStateObj = {
        // Ссылка на элемент поля.
        $field?: HTMLInputElement,
        // Значение поля.
        value: FieldValue
        // Тип поля: text, select, checkbox, radio
        fieldType: FieldType
        // Сколько значений может быть у поля: zero (ни одного (если это кнопка)), one (одно) или many (несколько). Это зависит от типа поля.
        valueCount: ValueCount
        // Любые данные поля.
        data: FieldData
    }

    // Тип поля
    export type FieldType = 'unknown' | 'text' | 'select' | 'checkbox' | 'radio' | 'button'
    // Сколько значений может быть у поля: нисколько (кнопка), одно или несколько
    export type ValueCount = 'unknown' | 'zero' | 'one' | 'many'

    export type FormStateObj = {
        // Ссылка на элемент формы.
        $form?: $form
        // Данные формы заполняемые пользователем
        data: FieldData
    }


    // ОБЪЕКТ ВОЗВРАЩАЕМЫЙ ХУКОМ useFormHandler ---------------------------
    // Объект возвращаемый useFormHandler
    export type ReturnObj = {
        // Обработчики добавляемые на <form>
        formHandlers: FormHandlers
        // Обработчик изменения поля добавляемый каждому полю
        onChangeFieldHandler: BrowserEventHandler
        // Состояние формы
        formState: FormState
        // Функция устанавливающая новое Состояние формы
        setFormState: SetFormState
        fields: ReturnFieldsObj,
        setFieldValue: SetFieldValue
        // Любые данные касаемые формы.
        form: FieldData
    }
    export type FormHandlers = {
        onChange:     BrowserEventHandler
        onFocus:      BrowserEventHandler
        onBlur:       BrowserEventHandler
        onClick:      BrowserEventHandler
        onSubmit:     BrowserEventHandler
    }
    export type ReturnFieldsObj = {
        // Имя поля. Например email
        [key: string]: {
            // Значение поля.
            value: FieldValue
            data: FieldData
        }
    }
    // Функция-обработчик браузерного события
    export type BrowserEventHandler = (e: React.BaseSyntheticEvent) => void


    // ПРОЧИЕ ТИПЫ --------------------------------------------------
    // Элемент формы
    export type $form = HTMLFormElement
    // События формы, которые разрешено использовать
    export type FormEventsNames = 'change' | 'focus' | 'blur' | 'click' | 'submit'
    // Состояние объекта браузерного события
    export type BrowserEventState = {
        browserEvent: null | React.BaseSyntheticEvent,
        eventName: null | FormEventsNames,
        fieldName?: null | string
    }
}

export default FHTypes
