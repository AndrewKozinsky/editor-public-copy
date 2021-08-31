import React from 'react'
import { useGetItemClasses } from './ItemsList-func'
import './ItemsList.scss'


export type ItemType = {
    id: string
    name: string
    onClick: () => void // Функция запускаемая при щелчке по пункту
}

export type ItemsListPropType = {
    items: ItemType[], // Список пунктов
    activeItemId: string // id выбранного пункта
}

export default function ItemsList(props: ItemsListPropType) {
    const {
        items,
        activeItemId
    } = props

    return (
        <div>
            {
                items.map(item => {
                    if (item.id === activeItemId) {
                        return <Item item={item} key={item.id} isActive />
                    } else {
                        return <Item item={item} key={item.id} />
                    }
                })
            }
        </div>
    )
}


type ItemPropType = {
    item: ItemType, // Данные пункта
    isActive?: boolean // Активен ли пункт
}

/** Кнопка списка */
function Item(props: ItemPropType) {
    const {
        item,
        isActive,
    } = props

    // Формирование классов кнопки
    const classes = useGetItemClasses(isActive)

    return (
        <button className={classes} onClick={item.onClick}>
            {item.name}
        </button>
    )
}
