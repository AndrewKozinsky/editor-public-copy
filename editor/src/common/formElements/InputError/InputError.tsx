import React, {ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import { makeCN } from 'utils/StringUtils'
import './InputError.scss'


export type InputErrorPropType = {
    text?: ReactNode
}

/**
 * Компонент текстового уведомления.
 * Если передать тип, то это будет или сообщение об ошибке или об успехе.
 */
export default function InputError(props: InputErrorPropType) {
    const { text } = props

    // Классы обёртки уведомления
    const CN = 'input-error'
    const classes = [CN, CN + '--error']

    if (!text) return null

    return (
        <div className={makeCN(classes)}>
            <SvgIcon type='errorTriangle' extraClass={CN + '__icon'} />
            <p className={CN + '__paragraph'}>{text}</p>
        </div>
    )
}
