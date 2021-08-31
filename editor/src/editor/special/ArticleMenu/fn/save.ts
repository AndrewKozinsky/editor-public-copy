import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'

/** The hook returns boolean if Save article button is disabled */
export function useIsSaveBtnDisabled() {
    const { historyCurrentIdx, historyStepWhenWasSave } = useSelector((store: AppStateType) => store.article)

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        if (!history?.length) return

        // Button is disabled when History step when article was saved is equal to current history step
        setIsDisabled( historyStepWhenWasSave === historyCurrentIdx )
    }, [historyCurrentIdx, historyStepWhenWasSave])

    return isDisabled
}

/** The hook returns on Save article button click handler */
export function useSaveArticle() {
    const { history, historyCurrentIdx, articleUuId } = useSelector((store: AppStateType) => store.article)

    return useCallback(async function () {
        await articleManager.saveArticle(history, historyCurrentIdx, articleUuId)
    }, [history, historyCurrentIdx, articleUuId])
}
