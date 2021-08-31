import React from 'react'
// @ts-ignore
import { Link, useRouteMatch } from 'react-router-dom'
import './Menu.scss'


// Корневой класс
const CN = 'menu'

// Тип props у компонента Menu
export type MenuPropType = {
    items: MenuItems
}
// Тип массива данных для генерации пунктов меню
export type MenuItems = MenuItem[]
export type MenuItem = {to: string, label: string}

/** Компонент меню. Сейчас используется на форме входа. */
export default function Menu(props: MenuPropType) {

    const {
        items
    } = props

    const $items = items.map((item, i) => {
        return (
            <li className={`${CN}__li`} key={i}>
                <MenuLink to={item.to} label={item.label} key={i} />
            </li>
        )
    })

    return (
        <nav className={CN}>
            <ul className={`${CN}__ul`}>
                {$items}
            </ul>
        </nav>
    )
}


/** Компонент ссылки меню */
function MenuLink(props: MenuItem) {

    const {
        to, // Куда ведёт ссылка
        label // Текст ссылки
    } = props

    // Соответствует ли текущей адрес переданной ссылке
    let match = useRouteMatch({
        path: to,
        exact: true
    })

    const classes: string[] = []
    if (match) classes.push(`${CN}--disabled-link`)

    return <Link to={to} className={classes}>{label}</Link>
}
