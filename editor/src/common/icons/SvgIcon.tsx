import React from 'react'
import { getIcon } from './js/getIcon'
import { getIconSize } from './js/getIconSize'
import { makeCN } from 'utils/StringUtils'
import './css/SvgIcon.scss'


type BaseClasses = '-black-fill' | '-icon-fill' | '-white-fill' | '-icon-stroke'

export type SvgIconPropType = {
    type: string // Тип значка
    baseClass?: BaseClasses // Класс значка из готового набора классов
    extraClass?: string // Класс значка если нужного нет в готовом наборе
}

/** Значёк */
export default function SvgIcon(props: SvgIconPropType) {

    let {
        type, // Тип значка
        baseClass, // Класс значка
        extraClass, // Класс значка
    } = props

    // Значёк
    const Icon = getIcon(type)
    // Размеры
    const iconSizes = getIconSize(type)

    // Классы
    const CN = 'icon'
    let className = ''

    if (!baseClass && !extraClass) className = `${CN}-black-fill`
    else if (baseClass && !extraClass) className = `${CN}${baseClass}`
    else if (!baseClass && extraClass) className = extraClass
    else className = makeCN([`${CN}${baseClass}`, extraClass])

    return (
        <svg {...iconSizes} className={className}>
            {/*@ts-ignore*/}
            <Icon />
        </svg>
    )
}
