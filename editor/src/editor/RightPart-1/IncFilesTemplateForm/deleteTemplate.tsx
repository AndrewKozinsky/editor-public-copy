import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import { incFilesTemplateSectionMessages } from 'messages/incFilesTemplateSectionMessages'
import { useDeleteIncFilesTemplate } from 'src/requests/editor/incFiles/deleteIncFilesTemplateRequest'


export function ModalContent() {
    const dispatch = useDispatch()

    // Запрос на удаление пользователя
    const {response: deleteResponse, doFetch: deleteTemplate} = useDeleteIncFilesTemplate()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Скачать новый список шаблонов и поставить в Хранилище
        store.dispatch(actions.sites.requestIncFilesTemplates())

        // Обнулить id выбранного шаблона
        store.dispatch(actions.sites.setCurrentIncFilesTemplateId(null))
    }, [deleteTemplate])

    return (
        <>
            <p>{incFilesTemplateSectionMessages.deletePluginConfirmationTextInModal}</p>
            <Wrapper>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={incFilesTemplateSectionMessages.closeDeletePluginModalBtn}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={incFilesTemplateSectionMessages.deletePluginBtnInModal}
                    color='accent'
                    onClick={deleteTemplate}
                />
            </Wrapper>
        </>
    )
}
