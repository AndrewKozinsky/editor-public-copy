import React, { ReactElement, useRef } from 'react'
import { MiscTypes } from 'types/miscTypes'
import Loader from 'common/misc/Loader/Loader'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import { getButtonClasses, useSetFocus } from './Button-func'
import SvgIcon, { SvgIconPropType } from '../../icons/SvgIcon'
import './Button.scss'


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    big?: boolean, // Is button big
    align?: 'center' | 'right'
    icon?: ButtonIconType
    text?: string | ReactElement
    name?: string
    loading?: boolean
    block?: boolean // Должна ли кнопка быть блочным элементом на всю ширину
    extraClass?: string
    id?: string
    onClick?: (...args: any[]) => void
    disabled?: boolean
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
}

export type ButtonIconType = 'btnSignSave' | 'btnSignFolder' | 'btnSignTrash'| 'btnSignCode'
    | 'btnSignAdd' | 'btnSignJson' | 'btnSignClose' | 'btnSignExit' | 'btnSignEdit' | 'btnSignUndo' | 'btnSignRedo' | 'btnSignCancel'


/** Компонент кнопки */
export default function Button(props: ButtonPropType) {

    let {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        icon, // Тип значка
        text, // Текст на кнопке
        name, // Атрибут name кнопки
        disabled = false, // Заблокирована ли кнопка
        loading = false, // Нужно ли на кнопке рисовать загрузчик
        onClick,
        id,
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    const CN = 'btn'

    // Язык интерфейса
    const lang = useSelector((store: AppStateType) => store.settings.editorLanguage)

    // Ссылка на элемент
    const buttonRef = useRef(null)
    // Установка фокусировки при необходомости
    useSetFocus(buttonRef, autoFocus)

    // Текст кнопки
    let btnText: null | string | ReactElement = null
    if (view !== 'onlyIcon' && text) btnText = text

    // При загрузке поменять текст кнопки
    if (btnText && loading) {
        if (lang === 'eng') btnText = 'Sending...'
        if (lang === 'rus') btnText = 'Отправка...'
    }

    // Если включена загрузка, то заблокировать кнопку и убрать значёк
    if (loading) {
        disabled = true
        icon = undefined
    }

    // Атрибуты кнопки
    const btnAttrs: MiscTypes.ObjStringKeyAnyVal = {
        type,
        className: getButtonClasses(props),
        disabled: disabled,
        ref: buttonRef
    }
    if (name) btnAttrs.name = name
    if (onClick) btnAttrs.onClick = onClick
    if (id) btnAttrs.id = id


    return (
        <button {...btnAttrs}>
            <ButtonIcon iconType={icon} CN={CN} color={color} />
            <ButtonLoader loading={loading} />
            {btnText}
        </button>
    )
}


type ButtonIconPropType = {
    iconType: string // Тип значка. Если не передан, то кнопка не будет отрисована
    CN: string // Корневой класс кнопки
    color?: 'base' | 'accent' // Цвет заливки кнопки
}

function ButtonIcon(props: ButtonIconPropType) {
    const {
        iconType,
        CN,
        color
    } = props

    if (!iconType) return null

    const attrs: SvgIconPropType = {
        type: iconType,
        baseClass: `-icon-fill`,
        extraClass: `${CN}__icon`
    }
    if (color === 'accent') {
        attrs.baseClass = '-white-fill'
    }

    return <SvgIcon {...attrs}  />
}


type ButtonLoaderPropType = {
    loading?: boolean // Нужно ли отрисовывать загрузчик
}

/** Компонент загрузчика кнопки */
function ButtonLoader(props: ButtonLoaderPropType) {
    const { loading = false } = props

    if (!loading) return null
    return <Loader className='btn-loader' />
}
