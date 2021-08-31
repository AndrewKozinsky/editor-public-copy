import React from 'react'
import './LeftPart-4.scss'


type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

/** Левая часть первой главной вкладки */
export default function LeftPart4(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Атрибуты обёртки панели
    const CN = 'left-part-4'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>

        </div>
    )
}
