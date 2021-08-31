import React from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import useGetMessages from 'messages/fn/useGetMessages'
import getSubmitBtnFormConfig from './submitBtnFormConfig'


export function ModalContent() {
    const userAccountSectionMsg = useGetMessages(userAccountSectionMessages)
    const submitBtnFormConfig = getSubmitBtnFormConfig(userAccountSectionMsg)

    const formState = useFormConstructorState(submitBtnFormConfig)


    return (
        <ModalShortContent
            header={userAccountSectionMsg.confirmModalHeader}
            text={userAccountSectionMsg.confirmModalText}
            bottomElem={
                <FormConstructor config={submitBtnFormConfig} state={formState} />
            }
        />
    )
}
