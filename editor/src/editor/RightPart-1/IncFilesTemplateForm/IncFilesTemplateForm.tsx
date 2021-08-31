import React from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import useGetShowModal from 'utils/hooksUtils'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import Button from 'common/formElements/Button/Button'
import {
    useGetAnotherTemplate,
    useGetSubmitButtonText
} from './IncFilesTemplateForm-func'
import { incFilesTemplateSectionMessages } from 'messages/incFilesTemplateSectionMessages'
import { ModalContent } from './deleteTemplate'


/** Форма создания или редактирования шаблона подключаемых файлов */
export default function IncFilesTemplateForm() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'incFilesTemplate')
    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    useGetAnotherTemplate(fh.formState, fh.setFormState)

    // Текст и значёк на кнопке отправки
    const { submitName, submitIconType } = useGetSubmitButtonText()

    return (
        <Form name='incFilesTemplate' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={ incFilesTemplateSectionMessages.templateNameInput }
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    placeholder={incFilesTemplateSectionMessages.templateNamePlaceholder}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={incFilesTemplateSectionMessages.headInput }
                    inputType='textarea'
                    name='head'
                    value={fh.fields.head.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.head.data.error}
                    disabled={fh.fields.head.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={incFilesTemplateSectionMessages.bodyInput}
                    inputType='textarea'
                    name='body'
                    value={fh.fields.body.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.body.data.error}
                    disabled={fh.fields.body.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={submitName}
                    icon={submitIconType}
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <DeleteTemplateButton />
            </Wrapper>
        </Form>
    )
}

/** Кнопка удаления шаблона подключаемых файлов */
function DeleteTemplateButton() {
    // id текущего шаблона
    const { currentTemplateId } = useSelector((store: AppStateType) => store.sites.incFilesTemplatesSection)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent />)

    // Если никакой существующий шаблон не выделен, то не отрисовывать эту кноку
    if (!currentTemplateId) return null

    return (
        <Button
            type='button'
            text={incFilesTemplateSectionMessages.deleteSiteBtnText}
            icon='btnSignTrash'
            onClick={openDeleteTemplateConfirmation}
        />
    )
}
