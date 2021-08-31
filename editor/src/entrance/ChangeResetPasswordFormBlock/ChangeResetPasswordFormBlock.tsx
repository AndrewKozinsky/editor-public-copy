import React from 'react'
import useGetMessages from 'messages/fn/useGetMessages'
import { regMenuMessages } from 'messages/regMenuMessages'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import { changeResetPasswordFormMessages } from 'src/messages/changeResetPasswordFormMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import Notice from 'common/textBlocks/Notice/Notice'
import Button from 'common/formElements/Button/Button'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import getConfig from './formConfig'


/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {
    const changeResetPasswordFormMsg = useGetMessages(changeResetPasswordFormMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)
    const config = getConfig(changeResetPasswordFormMsg)
    const formState = useFormConstructorState(config, changeResetPasswordFormMsg)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={changeResetPasswordFormMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            {formState.formSentSuccessfully && <PasswordChangedMessage />}
        </div>
    )
}


/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    let history = useHistory()
    const changeResetPasswordFormMsg = useGetMessages(changeResetPasswordFormMessages)

    function switchToEditor() {
        // Smooth hide entrance forms wrapper and show the editor
        smoothMoveToEditor()

        setTimeout(function() {
            history.push('/')
        }, 600)
    }

    return (
        <Notice bg icon='success'>
            <p>{changeResetPasswordFormMsg.passwordChanged}</p>
            <Wrapper t={10}>
                <Button
                    text={changeResetPasswordFormMsg.toEditor}
                    onClick={switchToEditor}
                />
            </Wrapper>
        </Notice>
    )
}
