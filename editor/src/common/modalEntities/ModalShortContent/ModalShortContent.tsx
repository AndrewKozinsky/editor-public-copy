import React, { ReactElement } from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Header from '../../textBlocks/Header/Header'

type ModalShortContentPropType = {
    header: string | ReactElement
    text:string | ReactElement
    bottomElem: ReactElement
}

/* Modal content component with header, text and any number of buttons */
function ModalShortContent(props: ModalShortContentPropType) {
    const { header, text, bottomElem } = props

    return (
        <>
            <Header text={header} type='h2' />

            <Wrapper t={10}>
                <p>{text}</p>
            </Wrapper>

            <Wrapper t={15}>
                {bottomElem}
            </Wrapper>
        </>
    )
}

export default ModalShortContent