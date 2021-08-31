import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import {useDeleteSite} from 'src/requests/editor/sites/deleteSiteRequest'



/** Содержимое модального окна */
export function ModalContent() {
    const dispatch = useDispatch()

    // Запрос на удаление пользователя
    const {response: deleteResponse, doFetch: deleteSite} = useDeleteSite()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Скачать новый список сайтов и поставить в Хранилище
        store.dispatch(actions.sites.requestSites())

        // Обнулить id выбранного сайта
        store.dispatch(actions.sites.setCurrentSiteId(null))
    }, [deleteSite])

    return (
        <>
            <p>{siteSectionMessages.deleteSiteConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={siteSectionMessages.closeDeleteSiteModalBtn}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={siteSectionMessages.deleteSiteBtnInModal}
                    color='accent'
                    onClick={deleteSite}
                />
            </Wrapper>
        </>
    )
}
