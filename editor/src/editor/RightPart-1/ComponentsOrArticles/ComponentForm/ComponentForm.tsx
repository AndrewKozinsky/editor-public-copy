import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import { componentFormMessages } from 'messages/componentTemplateFormMessages'
import { useGetAnotherComponent } from './ComponentForm-func'
import useGetShowModal from 'utils/hooksUtils'
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal'

export default function ComponentForm() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'component')

    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    useGetAnotherComponent(fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<DeleteItemModal type='component' />)

    return (
        <Form name='component' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={componentFormMessages.componentNameInput}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    placeholder={componentFormMessages.componentNamePlaceholder}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={componentFormMessages.componentCodeInput}
                    inputType='textarea'
                    name='code'
                    value={fh.fields.code.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.code.data.error}
                    disabled={fh.fields.code.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={componentFormMessages.submitBtnText}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={componentFormMessages.deleteComponentBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
