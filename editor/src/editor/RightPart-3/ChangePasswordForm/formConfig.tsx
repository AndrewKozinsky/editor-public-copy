import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import changePasswordRequest from 'requests/user/changePasswordRequest'

function getConfig(commonMsg: any, changePasswordSectionMsg: any) {
    const config: FCType.Config = {
        fields: {
            currentPassword: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong)
                },
                fieldData: {
                    label: changePasswordSectionMsg.currentPasswordField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'current-password'
                }
            },
            newPassword: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong)
                },
                fieldData: {
                    label: changePasswordSectionMsg.newPasswordField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'new-password'
                }
            },
            newPasswordAgain: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.newPassword.value[0]], changePasswordSectionMsg.passwordsMustMatch)
                },
                fieldData: {
                    label: changePasswordSectionMsg.newPasswordAgainField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'new-password'
                }
            },
        },
        bottom: {
            submit: {
                text: changePasswordSectionMsg.submitBtnText
            },
            align: 'left',
            topOffset: 'small'
        },
        async requestFn(readyFieldValues) {
            const currentPassword = readyFieldValues.currentPassword.toString()
            const newPassword = readyFieldValues.newPassword.toString()
            return await changePasswordRequest(currentPassword, newPassword)
        },
        showCommonSuccess: true,
        commonSuccess: changePasswordSectionMsg.passwordHasChanged
    }

    return config
}

export default getConfig