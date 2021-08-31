import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import loginRequest from 'src/requests/user/loginRequest'
import actions from 'src/store/rootAction'
import { store } from 'src/store/rootReducer'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import userActions from '../../store/user/userActions'


function getConfig(commonMsg: any, enterFormMsg: any) {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(enterFormMsg.emailErrInvalid)
                        .max(100, commonMsg.emailToLong)
                },
                fieldData: {
                    label: enterFormMsg.emailField,
                    autocomplete: 'email',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: 500,
                }
            },
            password: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong)
                },
                fieldData: {
                    label: enterFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'current-password',
                }
            }
        },
        bottom: {
            submit: {
                text: enterFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            // @ts-ignore
            return await loginRequest(readyFieldValues)
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
            else if (response.status === 'fail') {
                if (response.commonError === 'user_login_userDoesNotConfirmEmail') {
                    outerFns.setShowConfirmEmailMessage(true)
                    // Hide form
                    formDetails.setFormVisible(false)
                }
            }
        }
    }

    return config
}


export default getConfig







