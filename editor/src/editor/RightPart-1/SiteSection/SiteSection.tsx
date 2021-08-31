import React from 'react'
import useFormHandler from 'libs/formHandler/useFormHandler'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Select from 'common/formElements/Select/Select'
import Hr from 'common/misc/Hr/Hr'
import getFormConfig from './formResources'
import {
    useGetAnotherSite,
    useGetDeleteSiteVisibilityStatus,
    useGetSubmitButtonText,
    useManageTemplatesSelect
} from './SiteSection-func'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import { ModalContent } from './deleteSite'
import useGetShowModal from 'utils/hooksUtils'
import './SiteSection.scss'


/** Блок с формой изменения данных выбранного сайта */
export default function SiteSection() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'site')
    // Изменение данных формы при выделении другого сайта
    useGetAnotherSite(fh.formState, fh.setFormState)

    // Можно ли показывать выпадающий список с выбором шаблона подключаемых сайтов по умолчанию
    const {isVisible, selectOptions} = useManageTemplatesSelect(fh)

    // Текст на кнопке отправки
    const {submitName, submitIconType} = useGetSubmitButtonText()

    const CN = 'site-section'

    return (
        <div className={CN}>
            <Form name='site' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ siteSectionMessages.siteNameInput }
                        name='name'
                        value={fh.fields.name.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        placeholder={siteSectionMessages.siteNamePlaceholder}
                        error={fh.fields.name.data.error}
                        disabled={fh.fields.name.data.disabled}
                    />
                </Wrapper>
                {isVisible && <Wrapper t={15}>
                    <Select
                        label={ siteSectionMessages.defaultTemplateInput }
                        name='defaultIncFilesTemplateId'
                        value={fh.fields.defaultIncFilesTemplateId.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        options={selectOptions}
                    />
                </Wrapper>}
                <Wrapper t={20}>
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
                    <DeleteSiteButton />
                </Wrapper>
            </Form>
        </div>
    )
}

/** Кнопка удаления сайта */
function DeleteSiteButton() {

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteConfirmation = useGetShowModal(<ModalContent />)

    // Нужно ли показывать кнопку удаления сайта
    const isDeleteSiteButtonVisible = useGetDeleteSiteVisibilityStatus()
    if (!isDeleteSiteButtonVisible) return null

    return (
        <Button
            type='button'
            text={siteSectionMessages.deleteSiteBtnText}
            icon='btnSignTrash'
            onClick={openDeleteSiteConfirmation}
        />
    )
}
