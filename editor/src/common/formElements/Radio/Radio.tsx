import React, { ReactElement, useState } from 'react'
import { MiscTypes } from 'types/miscTypes'
import { getRandomId } from 'utils/StringUtils'
import './Radio.scss'


export type RadioPropType = {
    label: string | ReactElement // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    checked?: boolean // Отмечено ли поле
    disabled?: boolean // Заблокировано ли поле
    onChange: (e: React.BaseSyntheticEvent) => void // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Компонент выпадающего списка */
export default function Radio(props: RadioPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        checked, // Отмечено ли поле
        disabled = false, // Заблокировано ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты переключателя
    const inputAttribs: MiscTypes.ObjStringKeyAnyVal = {
        type: 'radio',
        name,
        value,
        id,
        checked,
        className: 'radio-input',
        onChange,
    }
    if (onBlur) inputAttribs.onBlur = onBlur
    if (disabled) inputAttribs.disabled = true

    // Атрибуты label
    const labelAttribs: MiscTypes.ObjStringKeyAnyVal = {
        htmlFor: id,
        className: 'radio-label',
    }

    return (
        <>
            <input {...inputAttribs} />
            <label {...labelAttribs}>{label}</label>
        </>
    )
}
