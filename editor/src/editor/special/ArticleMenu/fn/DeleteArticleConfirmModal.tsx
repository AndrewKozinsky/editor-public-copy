import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {articleMenuMessages} from 'messages/articleMenuMessages'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


export function DeleteArticleConfirmModal() {
    const dispatch = useDispatch()
    const { articleUuId } = useSelector((store: AppStateType) => store.article)
    const { currentArtItemId } = useSelector((store: AppStateType) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const closeModal = useCallback(async function () {
        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(async function () {
        await articleManager.deleteArticle(articleUuId)

        store.dispatch( actions.article.clearArticle() )

        // If the editable article id is equal to an opened article id in Sites main tab,
        // then clear opened article id in Sites main tab
        if (articleUuId === currentArtItemId) {
            store.dispatch( actions.sites.setCurrentArtItemId(null))
        }

        // WRITE CODE MAKES REQUEST FOR ARTICLES FOLDERS AND SETS THEM IN STORE >>>

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{articleMenuMessages.deleteConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={articleMenuMessages.closeBtnInDeleteModal}
                    onClick={closeModal}
                />
                <Button
                    color='accent'
                    text={articleMenuMessages.deleteBtnInDeleteModal}
                    onClick={deleteArticle}
                />
            </Wrapper>
        </>
    )
}

