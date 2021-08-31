import React, {ReactElement, ReactNode} from 'react'
import Radio from '../Radio/Radio'
import Checkbox from '../Checkbox/Checkbox'
import Label from '../Label/Label'
import { getFieldGroupClasses } from './FieldGroup-func'
import './FieldGroup.scss'


type InputDataType = { label: string | ReactElement, value: string }

/** Компонент FieldGroup в зависимости от переданного объекта отрисовывает флаги или переключатели. */
export type FieldGroupPropType = {
    label?: string | ReactElement
    inputType: 'radio' | 'checkbox'
    groupName: string
    inputsArr: InputDataType[]
    value: string[]
    gap?: 20 // Отступы между элементами внутри обёртки
    vertical?: boolean // Are the inputs arranged vertically?
    disabled?: boolean // Заблокировано ли поле
    onChange: (e: React.BaseSyntheticEvent) => void
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

export default function FieldGroup(props: FieldGroupPropType) {
    const {
        label,
        inputType,
        groupName,
        inputsArr,
        value,
        gap,
        vertical = false,
        disabled = false, // Заблокировано ли поле
        onChange,
        onBlur
    } = props

    const $label = label ? <Label label={label} bold /> : null

    // Получение типа поля: переключатель или флаг
    let Component = (inputType == 'checkbox') ? Checkbox : Radio

    return (
        <>
            {$label}
            <InputsWrapper gap={gap} vertical={vertical}>
                {inputsArr.map((inputData, i) => {

                    const attrs = {
                        value: inputData.value,
                        label: inputData.label,
                        name: groupName,
                        checked: !!value.includes(inputData.value),
                        disabled,
                        key: i,
                        onChange,
                        onBlur
                    }

                    return <Component {...attrs} />
                })}
            </InputsWrapper>
        </>
    )
}


export type InputsWrapperType = {
    gap: number,
    vertical: boolean
    children: ReactNode
}

function InputsWrapper(props: InputsWrapperType) {
    const {
        gap,
        vertical,
        children
    } = props

    // Классы обёртки
    const cls = getFieldGroupClasses(vertical, gap)

    return <div className={cls}>{children}</div>
}
