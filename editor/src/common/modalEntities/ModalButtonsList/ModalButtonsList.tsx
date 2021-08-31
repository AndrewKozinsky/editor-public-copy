import React, { ReactElement } from 'react'
import Wrapper from '../../Wrapper/Wrapper'

type ModalButtonsListPropType = {
    buttons: ReactElement[]
}

function ModalButtonsList(props: ModalButtonsListPropType) {
    const { buttons } = props

    return buttons.map(($button, i) => {
        return (
            <Wrapper t={10} key={i}>
                {$button}
            </Wrapper>
        )
    })
}

export default ModalButtonsList