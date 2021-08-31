import React from 'react'
import NameSection from '../../wrappers/NameSection/NameSection'
import {componentsPanelMessages} from 'messages/componentsPanelMessages'
import TempCompList from '../TempCompList/TempCompList'
import './LeftPart-2.scss'

type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть второй главной вкладки */
export default function LeftPart2(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'left-part-2'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <div className={`${CN}__top`} >
                <NameSection header={componentsPanelMessages.header}>
                    <TempCompList />
                </NameSection>
            </div>
            <div className={`${CN}__bottom`} >
                2
            </div>
        </div>
    )
}
