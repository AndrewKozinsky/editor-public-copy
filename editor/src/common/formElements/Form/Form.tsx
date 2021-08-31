import React, { ReactNode } from 'react'
import FHTypes from 'libs/formHandler/types'
import './Form.scss'


type FormPropType = {
    name: string
    formHandlers: FHTypes.FormHandlers
    children: ReactNode
}

/** Компонент формы оборачивающий поля */
export default function Form(props: FormPropType) {
    const {
        name,
        formHandlers,
        children
    } = props

    // Классы формы
    const CN = 'form'

    return (
        <form name={name} {...formHandlers} className={CN}>
            {children}
        </form>
    );
}
