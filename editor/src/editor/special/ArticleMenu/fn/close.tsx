import React, {useCallback} from 'react'
import { useSelector } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import {AppStateType} from 'store/rootReducer'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


export function useCloseArticle(openConfirmModal: any) {
    const { historyStepWhenWasSave, historyCurrentIdx } = useSelector((store: AppStateType) => store.article)

    return useCallback(function () {
        const isArticleSaved  = articleManager.isArticleSave( historyStepWhenWasSave, historyCurrentIdx )

        if (isArticleSaved) {
            // Clear an article data in Store
            store.dispatch( actions.article.clearArticle() )
        }
        else {
            // Show confirmation modal
            openConfirmModal()
        }

    }, [historyStepWhenWasSave, historyCurrentIdx])
}
