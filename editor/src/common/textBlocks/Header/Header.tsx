import React, { ReactElement } from 'react'
import { getHeaderClasses } from './Header-func'
import './Header.scss'


export type HeaderPropType = {
    text: string | ReactElement
    type?: 'h1' | 'h2' // Тип заголовка: он задаёт тег заголовка и размер текста
}

/** Заголовок */
export default function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type = 'h1' // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    return (
        <h1 className={getHeaderClasses(type)}>
            { text }
        </h1>
    )
}
