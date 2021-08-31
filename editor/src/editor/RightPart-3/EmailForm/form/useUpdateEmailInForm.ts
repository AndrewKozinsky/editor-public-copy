import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {AppStateType, useAppSelector} from 'src/store/rootReducer'
import FCType from 'src/libs/FormConstructor/FCType'
import StoreUserTypes from 'store/user/userTypes'

export function useUpdateEmailInForm(formState: FCType.StateFormReturn) {
    const email = useSelector((store: AppStateType) => store.user.email)

    useEffect(function() {
        if (!email) return
        const emailField = formState.fields.email
        formState.updateField('email', { ...emailField, value: [email]})
    }, [email])
}
