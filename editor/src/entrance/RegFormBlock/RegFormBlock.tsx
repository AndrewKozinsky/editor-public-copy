import React from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/textBlocks/Notice/Notice'
import { getMenuItems } from '../menuItems'
import { regFormMessages } from 'src/messages/regFormMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useGetMessages from 'messages/fn/useGetMessages'
import getConfig from './formConfig'
import { commonMessages } from 'messages/commonMessages'
import { regMenuMessages } from 'messages/regMenuMessages'


/** User Sign up form */
export default function RegFormBlock() {
    const commonMsg = useGetMessages(commonMessages)
    const regFormMsg = useGetMessages(regFormMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)
    const config = getConfig(commonMsg, regFormMsg)
    const formState = useFormConstructorState(config)


    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={regFormMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            <Info hide={ formState.formSentSuccessfully } />
        </div>
    )
}

type InfoPropType = {
    hide: boolean
}

function Info(props: InfoPropType) {
    const regFormMsg = useGetMessages(regFormMessages)

    if (props.hide) return null

    return (
        <>
            <Wrapper t={20}>
                <Notice>{regFormMsg.legal}</Notice>
            </Wrapper>
            <Wrapper t={20}>
                <Notice>{regFormMsg.doYouHaveAccount}</Notice>
            </Wrapper>
        </>
    )
}
