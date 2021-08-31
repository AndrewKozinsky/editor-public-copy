import React from 'react'
import { userDataSectionMessages } from 'messages/userDataSectionMessages'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import submitBtnFormConfig from './submitBtnFormConfig'
import useGetMessages from 'messages/fn/useGetMessages'
import getSubmitBtnFormConfig from './submitBtnFormConfig'

type ModalContentPropType = {
    newEmail: string
}

export default function ModalContent(props: ModalContentPropType) {
    const { newEmail } = props
    const userDataSectionMsg = useGetMessages(userDataSectionMessages)
    const submitBtnFormConfig = getSubmitBtnFormConfig(userDataSectionMsg)

    const formState = useFormConstructorState(
        submitBtnFormConfig,
        {newEmail}
    )

    return (
        <ModalShortContent
            header={userDataSectionMsg.confirmModalHeader}
            text={userDataSectionMsg.confirmModalText}
            bottomElem={<FormConstructor config={submitBtnFormConfig} state={formState} />}
        />
    )
}
