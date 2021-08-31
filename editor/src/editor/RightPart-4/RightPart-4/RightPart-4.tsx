import React from 'react'
import './RightPart-4.scss'


type RightPart4PropType = {
    display?: boolean
}

/** Правая часть третьей главной вкладки */
export default function RightPart4(props: RightPart4PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'right-part-4'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>

        </div>
    )
}
