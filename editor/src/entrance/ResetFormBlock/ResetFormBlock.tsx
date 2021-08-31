import React from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import useGetMessages from 'messages/fn/useGetMessages'
import { regMenuMessages } from 'messages/regMenuMessages'
import { resetFormMessages } from 'src/messages/resetFormMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import { commonMessages } from 'messages/commonMessages'
import getConfig from './formConfig'


/** Форма сброса пароля */
export default function ResetFormBlock() {
    const commonMsg = useGetMessages(commonMessages)
    const resetFormMsg = useGetMessages(resetFormMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)
    const config = getConfig(commonMsg, resetFormMsg)
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={resetFormMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
