import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import Select from 'common/formElements/Select/Select'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import {useGetEditArticleBtnHandler, useManageTemplatesSelect } from './ArticleForm-func'
import { articleFormMessages } from 'messages/articleFormMessages'
import { useGetAnotherArticle } from './ArticleForm-func'
import DeleteItemModal from '../../ComponentsOrArticles/DeleteItemModal/DeleteItemModal'
import useGetShowModal from 'utils/hooksUtils'

export default function ArticleForm() {
    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'article')

    // Изменение данных формы при выделении другой статьи
    useGetAnotherArticle(fh.formState, fh.setFormState)

    // Можно ли показывать выпадающий список с выбором шаблона подключаемых сайтов и список элементов
    const {isSelectVisible, selectOptions} = useManageTemplatesSelect(fh)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<DeleteItemModal type='article' />)

    // Edit Article button handler
    const onEditArticleBtnHandler = useGetEditArticleBtnHandler()

    return (
        <Form name='article' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={articleFormMessages.articleNameInput}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            {isSelectVisible && <Wrapper t={15}>
                <Select
                    label={ articleFormMessages.defaultTemplateInput }
                    name='incFilesTemplateId'
                    value={fh.fields.incFilesTemplateId.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    options={selectOptions}
                />
            </Wrapper>}
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={articleFormMessages.submitBtnText}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={articleFormMessages.deleteArticleBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
                <Button
                    type='button'
                    color='accent'
                    text={articleFormMessages.editArticleBtnText}
                    icon='btnSignEdit'
                    onClick={onEditArticleBtnHandler}
                />
            </Wrapper>
        </Form>
    )
}
