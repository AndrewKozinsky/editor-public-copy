import React, { ReactElement, ReactNode } from 'react'
import { getHeaderClasses } from './NameSection-func'
import './NameSection.scss'


type NameSectionPropType = {
    type?: 1 | 2 // Размер компонента: 1 (больше) или 2 (меньше)
    header: string | ReactElement // Текст заголовка
    children?: ReactNode // Дети компонента
}

/* Компонент блока с заголовком */
function NameSection(props: NameSectionPropType) {
    const {
        type = 1,
        header,
        children,
    } = props

    const CN = 'name-section'

    // Классы обёртки
    const headerClasses = getHeaderClasses(type)

    return (
        <div>
            <h3 className={headerClasses}>
                <span className={`${CN}__header-bg`}>{header}</span>
            </h3>
            {children}
        </div>
    )
}

export default NameSection