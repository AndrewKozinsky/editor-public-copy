import React, {ReactNode} from 'react'
import {getWrapperClasses} from './Wrapper-func'
import './Wrapper.scss'


export type WrapperPropType = {
    children?: ReactNode, // Дети компонента
    align?: 'right' | 'center' | 'justify' // Выравнивание
    t?: TType // Отступ сверху
    b?: BType // Отступ снизу
    gap?: GapType // Отступы между элементами внутри обёртки
    style?: object
}

export type TType = 5 | 10 | 15 | 20 | 25 | 30
export type BType = 5 | 10 | 15 | 25
export type GapType = 10

/** Компонент дающий отступ оборачиваемому элементу */
export default function Wrapper(props: WrapperPropType) {
    const {
        children, // Дети компонента
        gap,
        style = {}
    } = props

    return (
        <div className={getWrapperClasses(props, gap)} style={style}>
            {children}
        </div>
    )
}
