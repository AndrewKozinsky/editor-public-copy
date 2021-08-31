import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { commonMessages } from 'messages/commonMessages'
import confirmEmailRequest from 'src/requests/user/confirmEmailRequest'
import { store } from 'src/store/rootReducer'
import actions from 'src/store/rootAction'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import userActions from '../../store/user/userActions'



function getConfig(confirmEmailMsg: any) {
    const config: FCType.Config = {
        fields: {
            token: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string().required(commonMessages.requiredField)
                },
                fieldData: {
                    autoFocus: true,
                    label: confirmEmailMsg.tokenField,
                }
            },
        },
        bottom: {
            submit: {
                text: confirmEmailMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            // @ts-ignore
            return await confirmEmailRequest(readyFieldValues.token)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {

                // Поставить токен авторизации в Хранилище
                store.dispatch(actions.user.setAuthTokenStatus(2))

                // Перебросить в редактор
                if ('history' in outerFns ) outerFns.history.push('/')

                // Set user's email to Store
                if ('data' in response) {
                    const email = response.data.user.email
                    store.dispatch( userActions.setEmail(email) )
                }

                // Smooth hide entrance forms wrapper and show the editor
                smoothMoveToEditor()
            }
        }
    }

    return config
}


export default getConfig