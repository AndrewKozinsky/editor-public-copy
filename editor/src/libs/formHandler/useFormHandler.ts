import {useState, useCallback, useEffect} from 'react'
import getInitialState from './functions/getInitialState'
import useGetForm from './functions/useGetForm'
import useSetServiceDataToForm from './functions/useSetServiceDataToForm'
import useBrowserEvent from './functions/useBrowserEvent'
import { handleBrowserEvent } from './functions/useHandlerBrowserEvent'
import getFields from './functions/getFields'
import inputChangeHandler from './functions/inputChangeHandler'
import useStateChangeHandler from './functions/useStateChangeHandler'
import useSubmitForm from './functions/useSubmitForm'
import {getSetFieldValue} from './functions/formStateSettersAndGetters'
import FHTypes from './types'


/**
 * Хук обрабатывающий формы. Возвращает объект со свойствами и методами для получения и установки данных в форму.
 * @param {Object} formConfig — объект настройки useFormHandler
 * @param {String} formName — имя формы
 */
export default function useFormHandler(
    formConfig: FHTypes.FormConfig, formName: string
): FHTypes.ReturnObj {

    // Состояние формы
    const [formState, setFormState] = useState<FHTypes.FormState>(getInitialState(formConfig))

    // Ссылка на форму
    const $form = useGetForm(formName)

    // Уточнение данных о полях при получении ссылки на форму
    useSetServiceDataToForm(formState, setFormState, $form)

    // При наступлении браузерного события в browserEvent записываются данные об этом.
    const { browserEvent, setBrowserEvent } = useBrowserEvent($form)

    // Обработка браузерного события
    useEffect(() => {
        handleBrowserEvent(browserEvent, formConfig, formState, setFormState, setBrowserEvent)
    }, [browserEvent])

    // При изменении Состояния формы у полей запускать код реагирующий на это событие
    useStateChangeHandler(formConfig, formState, setFormState)

    // Можно ли запускать отправку формы
    const setCanRunSubmitHandler = useSubmitForm(formConfig, formState, setFormState)

    return {
        // Обработчики формы
        formHandlers: {
            onChange:     useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'change', fieldName: e.target.name})
            }, [formState, browserEvent]),
            onFocus:     useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'focus', fieldName: e.target.name})
            }, [formState, browserEvent]),
            onBlur:     useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'blur', fieldName: e.target.name})
            }, [formState, browserEvent]),
            onClick:      useCallback((e) => {
                if (!e.target.name) return
                setBrowserEvent({browserEvent: e, eventName: 'click', fieldName: e.target.name})
            }, [formState, browserEvent]),
            onSubmit:     useCallback((e) => {
                // Запретить стандартную отправку формы
                e.preventDefault()

                // Начать отправку формы
                setCanRunSubmitHandler(true)
            }, [formState, browserEvent]),
        },
        // Обработчик изменения поля
        onChangeFieldHandler: useCallback((e) => {
            inputChangeHandler(e, formState, setFormState)
        }, [formState]),
        // Состояние формы
        formState: formState,
        // Функция устанавливающая новое Состояние формы
        setFormState: setFormState,
        // Данные о полях
        fields: getFields(formState),
        // Установщик нового значения поля
        setFieldValue: getSetFieldValue(),
        // Данные формы
        form: formState.form.data
    }
}
