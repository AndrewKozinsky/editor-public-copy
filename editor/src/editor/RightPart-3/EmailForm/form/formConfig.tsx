import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import { store } from 'src/store/rootReducer'
import actions from 'store/rootAction'
import ModalContent from '../modal/ModalContent'


function getConfig(userDataSectionMsg: any) {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(userDataSectionMsg.requiredField)
                        .email(userDataSectionMsg.emailErrInvalid)
                        .max(100, userDataSectionMsg.emailIsTooLong)
                },
                fieldData: {
                    label: userDataSectionMsg.emailField,
                    placeholder: userDataSectionMsg.emailPlaceholder,
                    maxWidth: 250,
                }
            }
        },
        bottom: {
            topOffset: 'small',
            submit: {
                text: userDataSectionMsg.submitBtnText,
            },
            align: 'left'
        },
        afterSubmit(response, outerFns, formDetails) {
            const newEmail = formDetails.readyFieldValues.email.toString()
            store.dispatch( actions.modal.openModal(<ModalContent newEmail={newEmail}/>) )
        },
    }

    return config
}



export default getConfig