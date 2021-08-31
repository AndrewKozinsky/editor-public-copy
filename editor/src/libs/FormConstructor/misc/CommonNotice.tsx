import React, { ReactElement } from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/textBlocks/Notice/Notice'


type NoticePropType = {
    type: 'error' | 'success' | null
    text?: string | ReactElement // Текст ошибки
}

/** Common error component */
export default function CommonNotice(props: NoticePropType) {
    const { type, text } = props

    if (!type) return null

    return (
        <Wrapper t={15}>
            <Notice icon={type} bg>
                {text}
            </Notice>
        </Wrapper>
    )
}
