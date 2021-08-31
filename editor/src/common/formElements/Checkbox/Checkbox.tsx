import React, {ReactElement, useState} from 'react'
import { MiscTypes } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils'
import './Checkbox.scss'


export type CheckboxPropType = {
    label: string | ReactElement // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    checked?: boolean // Отмечено ли поле
    disabled?: boolean // Заблокировано ли поле
    onChange: (e: React.BaseSyntheticEvent) => void // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Checkbox component */
export default function Checkbox(props: CheckboxPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        disabled = false, // Заблокировано ли поле
        checked, // Отмечено ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты флага
    const inputAttribs: MiscTypes.ObjStringKeyAnyVal = {
        type: 'checkbox',
        name,
        value,
        id,
        checked,
        className: 'checkbox-input',
        onChange
    }
    if (onBlur) inputAttribs.onBlur = onBlur
    if (disabled) inputAttribs.disabled = true

    // Атрибуты label
    const labelAttribs: MiscTypes.ObjStringKeyAnyVal = {
        htmlFor: id,
        className: 'checkbox-label',
    }

    return (
        <>
            <input {...inputAttribs} />
            <label {...labelAttribs}>{label}</label>
        </>
    )
}
