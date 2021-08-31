import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import regRequest from 'src/requests/user/regRequest'


function getConfig(commonMsg: any, regFormMsg: any) {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(regFormMsg.emailErrInvalid)
                        .max(100, commonMsg.emailToLong)
                },
                fieldData: {
                    label: regFormMsg.emailField,
                    autocomplete: 'username',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: true,
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
                    label: regFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
            passwordConfirm: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.password.value[0]], regFormMsg.passwordsMustMatch)
                },
                fieldData: {
                    label: regFormMsg.passwordConfirmField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
        },
        bottom: {
            submit: {
                text: regFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            // @ts-ignore
            return await regRequest(readyFieldValues)
        },
        afterSubmit(response) {},
        showCommonSuccess: true,
        commonSuccess: regFormMsg.confirmRegistrationLetter
    }

    return config
}


export default getConfig