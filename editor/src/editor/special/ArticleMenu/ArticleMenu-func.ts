import {useCallback, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import actions from 'store/rootAction'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


/** The hook returns is the Article menu button visible */
export function useGetIsButtonVisible() {
    // Current main tab
    const { mainTab } = useSelector((store: AppStateType) => store.settings)
    // Open article uuid
    const { articleUuId } = useSelector((store: AppStateType) => store.article)

    // Is Article menu button visible
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        // Article menu button is visible if user is in an article tab and an article is open
        const visibleStatus = mainTab === 1 && !!articleUuId

        setIsVisible(visibleStatus)
    }, [mainTab, articleUuId])

    return isVisible
}

/**
 * The hook checks if I can make undo or redo history step
 * @param {Object} stepType — step direction: undo OR redo
 */
export function useIsHistoryBtnDisabled(stepType: 'undo' | 'redo') {
    const {history, historyCurrentIdx} = useSelector((store: AppStateType) => store.article)

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        const canMakeStep = articleManager.canMakeHistoryStep(stepType, history, historyCurrentIdx)
        setIsDisabled(!canMakeStep)
    }, [history, historyCurrentIdx])

    return isDisabled
}

/**
 * The hook returns the a callback makes undo or redo step of article history
 * @param {Object} stepType — step direction: undo OR redo
 */
export function useMakeHistoryStep(stepType: 'undo' | 'redo') {
    const dispatch = useDispatch()

    return useCallback(function (){
        dispatch(actions.article.makeHistoryStep(stepType))
    }, [])
}


export function useIsDataBtnDisabled() {
    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {

    }, [])

    return isDisabled
}

export function useShowData() {
    const dispatch = useDispatch()

    return useCallback(function (){

    }, [])
}
