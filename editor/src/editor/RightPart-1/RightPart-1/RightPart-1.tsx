import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import SitePartProvider from '../SitePartProvider/SitePartProvider'
import SitePartTabs from '../SitePartTabs/SitePartTabs'
import './RightPart-1.scss'


type RightPart1PropType = {
    display?: boolean
}

/** Правая часть первой главной вкладки */
export default function RightPart1(props: RightPart1PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Выделенный сайт
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)

    const CN = 'right-part-1'
    const style = display ? {} : {display: 'none'}

    // Ничего не отрисовывать если сайт не выделен
    if (currentSiteId === null) return null

    return (
        <div className={CN} style={style}>
            <SitePartTabs />
            <SitePartProvider />
        </div>
    )
}
