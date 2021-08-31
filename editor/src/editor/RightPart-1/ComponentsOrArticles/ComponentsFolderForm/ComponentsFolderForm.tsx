import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import { useGetAnotherFolderData } from './ComponentsFolderForm-func'
import ModalContent from './deleteFolder'
import useGetShowModal from 'utils/hooksUtils'
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages'


/** Компонент формы редактирования папки */
export default function ComponentsFolderForm() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'folder')
    // Изменение данных формы при выделении другой папки шаблонов компонентов или статей
    useGetAnotherFolderData(fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления папки
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent />)

    return (
        <Form name='folder' formHandlers={fh.formHandlers}>
            <Wrapper b={15}>
                <TextInput
                    label={componentFolderFormMessages.folderNameInput}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={componentFolderFormMessages.submitBtnTextSave}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={componentFolderFormMessages.deleteFolderBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
