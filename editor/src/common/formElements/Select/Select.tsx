import React, {useState} from 'react'
import { getOptions, getWrapperClasses } from './Select-func'
import { OptionsType } from './SelectTypes'
import { MiscTypes } from 'types/miscTypes'
import { getRandomId } from 'utils/StringUtils'
import Label from '../Label/Label'
import SvgIcon from '../../icons/SvgIcon'
import './Select.scss'


export type SelectPropType = {
    label?: string // Подпись выпадающего списка
    name: string // Имя выпадающего списка
    value?: string | string[] // Выбранное значение выпадающего списка
    options: OptionsType // Массив для генерации тегов <option>
    onChange?: (e: React.BaseSyntheticEvent) => void, // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    disabled?: boolean // Заблокировано ли поле
}

/* Компонент выпадающего списка */
export default function Select(props: SelectPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя выпадающего списка
        value, // Выбранное значение выпадающего списка
        options, // Массив для генерации тегов <option>
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
        disabled = false, // Заблокировано ли поле
    } = props

    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Атрибуты поля
    const inputAttribs: MiscTypes.ObjStringKeyAnyVal = {
        name,
        className: 'select-input',
        onFocus: () => setIsFocus(true),
        onBlur: (e: React.BaseSyntheticEvent) => {
            // Поставить статус сфокусированности в Состояние
            setIsFocus(false)
            // Если передали обработчик потерей фокуса, то запустить
            if (onBlur) onBlur(e)
        },
        onChange
    }

    if (value) inputAttribs.value = value
    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label) inputAttribs.id = id
    if (disabled) inputAttribs.disabled = true


    return (
        <>
            <Label label={label}  id={id} />
            <div className={getWrapperClasses(isFocus)}>
                <select {...inputAttribs}>
                    {getOptions(options)}
                </select>
                <div className='select-input-wrapper__tip'>
                    <SvgIcon type='selectInputArrows' baseClass='-icon-stroke' />
                </div>
            </div>
        </>
    )
}
