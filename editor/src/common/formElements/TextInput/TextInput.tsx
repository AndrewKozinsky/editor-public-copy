import React, { useRef, useState } from 'react'
import { getRandomId } from 'utils/StringUtils'
import InputError from 'common/formElements/InputError/InputError'
import Wrapper from 'common/Wrapper/Wrapper'
import { MiscTypes } from 'types/miscTypes'
import Label from '../Label/Label'
import { getTextInputClasses, useSetFocus } from './TextInput-func'
import './TextInput.scss'


export type TextInputPropType = {
    label?: string // Подпись текстового поля
    inputType?: 'text' | 'textarea' // Тип поля ввода
    type?: 'text' | 'email' | 'password' // Тип поля
    name: string, // Аттрибут name текстового поля
    value: string, // Аттрибут value текстового поля
    autocomplete?: 'email' | 'username' | 'current-password' | 'new-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    maxWidth?: 250 // Максимальная ширина поля
    rows?: number // Количество рядов у текстового поля
    placeholder?: string, // Текстозаполнитель
    onChange: (e: React.BaseSyntheticEvent) => void, // Обработчик изменения поля
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    onKeyDown?: (e: React.BaseSyntheticEvent) => void, // Обработчик нажатия клавиши
    error?: string, // Текст ошибки
    disabled?: boolean // Заблокировано ли поле
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
}


/** Текстовый компонент */
export default function TextInput(props: TextInputPropType) {

    const {
        label, // Подпись текстового поля
        inputType = 'text', // Тип поля ввода
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,
        autocomplete = '', // Значение автозаполнения поля
        placeholder,    // Текстозаполнитель
        maxWidth, // Максимальная ширина поля
        rows = 5, // Количество рядов у текстового поля
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
        onKeyDown, // Обработчик нажатия клавиши
        error,
        disabled = false, // Заблокировано ли поле
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    // Ссылка на элемент чтобы при необходимости поставить фокусировку
    const inputRef = useRef(null)

    // Установка фокусировки при необходомости
    useSetFocus(inputRef, autoFocus)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Аттрибуты поля
    const inputAttribs: MiscTypes.ObjStringKeyAnyVal = {
        type,
        name,
        value,
        className: getTextInputClasses(maxWidth),
        onChange: onChange,
    }

    if (autocomplete) inputAttribs.autoComplete = autocomplete
    if (placeholder) inputAttribs.placeholder = placeholder
    if (onBlur) inputAttribs.onBlur = onBlur
    if (onKeyDown) inputAttribs.onKeyDown = onKeyDown

    return (
        <div>
            <Label label={label} disabled={disabled} id={id} />
            {inputType === 'text' &&
                <input {...inputAttribs} disabled={disabled} id={id} ref={inputRef} />
            }
            {inputType === 'textarea' &&
                <textarea {...inputAttribs} disabled={disabled} id={id} ref={inputRef} rows={rows} />
            }
            <Error error={error} />
        </div>
    )
}


/** Сообщение об ошибке текстового компонента */
function Error(props: { error: string }) {
    // Текст ошибки
    const { error } = props
    
    if (!error) return null

    return (
        <Wrapper t={5}>
            <InputError text={error} />
        </Wrapper>
    )
}
