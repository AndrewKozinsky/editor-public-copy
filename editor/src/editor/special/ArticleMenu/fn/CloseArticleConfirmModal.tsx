import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import { AppStateType } from 'store/rootReducer'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {articleMenuMessages} from 'messages/articleMenuMessages'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


export function CloseArticleConfirmModal() {
    const dispatch = useDispatch()
    const {history, historyCurrentIdx, articleUuId} = useSelector((store: AppStateType) => store.article)

    // Функция удаляющая выделенную папку
    const saveArticle = useCallback(async function () {
        await articleManager.saveArticle(history, historyCurrentIdx, articleUuId)

        store.dispatch( actions.article.clearArticle() )

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    // Функция удаляющая выделенную папку
    const clearArticle = useCallback(function () {
        store.dispatch( actions.article.clearArticle() )

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{articleMenuMessages.clearConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={articleMenuMessages.doNotSaveBtnInClearModal}
                    onClick={clearArticle}
                />
                <Button
                    color='accent'
                    text={articleMenuMessages.saveBtnInClearModal}
                    onClick={saveArticle}
                />
            </Wrapper>
        </>
    )
}
