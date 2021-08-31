import React, {ReactElement} from 'react'
import Header from '../textBlocks/Header/Header'
import './HeaderPage.scss'


type HeaderPagePropType = {
    headerText: string | ReactElement
    display?: boolean
    children: ReactElement | ReactElement[]
}

export default function HeaderPage(props: HeaderPagePropType) {

    const {
        headerText,
        display = false, // Показывать ли компонент
        children
    } = props

    // Корневой класс
    const CN = 'header-page'

    let content: ReactElement

    if (Array.isArray(children)) {
        content = (
            <div className={`${CN}__content-divided`}>
                <div className={`${CN}__content-divided-left`}>
                    {children[0]}
                </div>
                <div className={`${CN}__content-divided-center`} />
                <div className={`${CN}__content-divided-right`}>
                    {children[1]}
                </div>
            </div>
        )
    }
    else {
        content = (
            <div className={`${CN}__content-single`}>
                {children}
            </div>
        )
    }

    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <div className={`${CN}__header-wrapper`}>
                <Header text={headerText} type='h2'/>
            </div>
            {content}
        </div>
    )
}
