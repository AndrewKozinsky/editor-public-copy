import React from 'react'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import { useUpdateEmailInForm } from './useUpdateEmailInForm'
import { userDataSectionMessages } from 'src/messages/userDataSectionMessages'
import getConfig from './formConfig'
import useGetMessages from 'messages/fn/useGetMessages'


export default function EmailForm() {
    const userDataSectionMsg = useGetMessages(userDataSectionMessages)
    const formConfig = getConfig(userDataSectionMsg)

    // FormConstructor state manager
    const formState = useFormConstructorState(formConfig)
    // The hook updates email in form's field
    useUpdateEmailInForm(formState)

    return <FormConstructor config={formConfig} state={formState} />
}
