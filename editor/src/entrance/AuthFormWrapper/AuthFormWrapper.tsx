import React, { ReactNode } from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import './AuthFormWrapper.scss'


type AuthFormWrapperPropType = {
    children: ReactNode
}

/** Обёртка форм регистрации, входа пользователя и сброса пароля */
export default function AuthFormWrapper(props: AuthFormWrapperPropType) {
    const CN = 'auth-form-wrapper'

    return (
        <section className={CN}>
            <div className={`${CN}__logo-wrapper`}>
                <SvgIcon type='logo' baseClass='-black-fill' />
            </div>
            {props.children}
        </section>
    )
}
