import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import resetPasswordRequest from 'src/requests/user/resetPasswordRequest'

function getConfig(commonMsg: any, resetFormMsg: any) {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(commonMsg.emailErrInvalid)
                },
                fieldData: {
                    label: resetFormMsg.emailField,
                    autocomplete: 'email',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: true,
                }
            },
        },
        bottom: {
            submit: {
                text: resetFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            // @ts-ignore
            return await resetPasswordRequest(readyFieldValues.email)
        },
        afterSubmit(response) {

        },
        showCommonSuccess: true,
        commonSuccess: resetFormMsg.retypePasswordLetter
    }

    return config
}


export default getConfig