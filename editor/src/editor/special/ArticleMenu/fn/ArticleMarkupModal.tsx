import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import { AppStateType } from 'store/rootReducer'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {articleMenuMessages} from 'messages/articleMenuMessages'
import {turnArticleDataToHTML} from 'editor/RightPart-2/articleBuilder/articleBuilder'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


export function ArticleMarkupModal() {
    const dispatch = useDispatch()

    const {tempComps} = useSelector((store: AppStateType) => store.article)
    const article = articleManager.hooks.getArticle()

    const [markupStr, setMarkupStr] = useState('')

    useEffect(function () {
        if (!tempComps || !article) return

        const markupStr = turnArticleDataToHTML(article, tempComps)
        setMarkupStr(markupStr)
    }, [tempComps, article])


    // Функция удаляющая выделенную папку
    const closeModal = useCallback(function () {
        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{markupStr}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={articleMenuMessages.closeMarkupModalBtn}
                    onClick={closeModal}
                />
            </Wrapper>
        </>
    )
}

