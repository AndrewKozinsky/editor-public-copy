import React, {ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import { makeCN } from 'utils/StringUtils'
import './Notice.scss'


const CN = 'notice'

export type NoticePropType = {
    icon?: 'info' | 'error' | 'success' // Тип значка: info (информация), error (ошибка), success (успех)
    bg?: boolean // If there is a background
    children?: ReactNode
}

/** Компонент уведомления. */
export default function Notice(props: NoticePropType) {
    const { children, bg = false } = props

    const classes = [CN]
    if (bg) classes.push(CN + '--bg')

    return (
        <div className={ makeCN(classes) }>
            <Sign {...props} />
            <div>{children}</div>
        </div>
    )
}


/** Значёк левее содержимого */
function Sign(props: NoticePropType) {
    const { icon } = props

    if (icon === 'info') {
        return <SvgIcon type='noticeInfo' baseClass='-icon-fill' extraClass={CN + '__icon'} />
    }
    else if (icon === 'error') {
        return <SvgIcon type='noticeError' baseClass='-icon-fill' extraClass={CN + '__icon'} />
    }
    else if (icon === 'success') {
        return <SvgIcon type='noticeSuccess' baseClass='-icon-fill' extraClass={CN + '__icon'} />
    }

    return null
}
