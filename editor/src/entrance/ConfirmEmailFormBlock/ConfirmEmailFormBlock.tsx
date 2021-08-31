import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import useGetMessages from 'messages/fn/useGetMessages'
import { regMenuMessages } from 'messages/regMenuMessages'
import { confirmEmailMessages } from 'src/messages/confirmEmailMessages'
import getConfig from './formConfig'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()

    const confirmEmailMsg = useGetMessages(confirmEmailMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)
    const config = getConfig(confirmEmailMsg)
    const formState = useFormConstructorState(config, {history})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
