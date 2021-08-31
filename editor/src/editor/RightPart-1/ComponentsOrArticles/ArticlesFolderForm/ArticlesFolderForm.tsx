import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import { useGetAnotherFolderData } from './ArticlesFolderForm-func'
import ModalContent from './deleteFolder'
import useGetShowModal from 'utils/hooksUtils'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'



/** Компонент формы редактирования папки */
export default function ArticlesFolderForm() {

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
                    label={articleFolderFormMessages.folderNameInput}
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
                    text={articleFolderFormMessages.submitBtnTextSave}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={articleFolderFormMessages.deleteFolderBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
