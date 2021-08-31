import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import { makeCN } from 'utils/StringUtils'
import { notFoundMessages } from 'src/messages/notFoundMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import './NotFound.scss'


export default function NotFound() {
    const notFoundMsg = useGetMessages(notFoundMessages)

    // Класс обёртки
    const CN = 'not-found'

    // Классы заголовка
    const headerClasses = [`${CN}__header`, `${CN}__header`]

    return (
        <div className={CN}>
            <SvgIcon type='logo' />

            <Wrapper t={15}>
                <h1 className={makeCN(headerClasses)}>{notFoundMsg.header}</h1>
            </Wrapper>

            <Wrapper t={15}>
                <p>{notFoundMsg.p1}</p>
            </Wrapper>

            <Wrapper t={5}>
                <p>{notFoundMsg.p2}</p>
            </Wrapper>
        </div>
    )
}
