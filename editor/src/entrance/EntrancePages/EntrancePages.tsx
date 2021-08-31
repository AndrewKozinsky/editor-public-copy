import React from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'
import EnterFormBlock from 'entrance/EnterFormBlock/EnterFormBlock'
import AuthFormWrapper from 'src/entrance/AuthFormWrapper/AuthFormWrapper'
import RegFormBlock from 'entrance/RegFormBlock/RegFormBlock'
import ConfirmEmailFormBlock from 'src/entrance/ConfirmEmailFormBlock/ConfirmEmailFormBlock'
import ResetFormBlock from 'src/entrance/ResetFormBlock/ResetFormBlock'
import ChangeResetPasswordFormBlock from 'src/entrance/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock'
import { useGetWrapperClasses, useViewStateChanger } from './EntrancePages-func'
import './EntrancePages.scss'


export default function EntrancePages() {

    // Переставлять свойство entryAndEditorViewState в зависимости от текущей страницы
    useViewStateChanger()

    // Классы обёртки
    const {classes, isVisible} = useGetWrapperClasses()

    if (!isVisible) return null

    return (
        <div className={classes}>
            <AuthFormWrapper>
                <Switch>
                    <Route path='/reg'>
                        <RegFormBlock />
                    </Route>
                    <Route path='/confirm-email'>
                        <ConfirmEmailFormBlock />
                    </Route>
                    <Route path='/reset-password'>
                        <ResetFormBlock />
                    </Route>
                    <Route path='/change-reset-password'>
                        <ChangeResetPasswordFormBlock />
                    </Route>
                    <Route path='*'>
                        <EnterFormBlock />
                    </Route>
                </Switch>
            </AuthFormWrapper>
        </div>
    )
}
