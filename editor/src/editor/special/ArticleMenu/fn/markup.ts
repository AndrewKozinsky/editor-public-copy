import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'

export function useIsMarkupBtnDisabled() {
    const {articleUuId} = useSelector((store: AppStateType) => store.article)
    const article = articleManager.hooks.getArticle()

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        const isArticleExists = articleUuId && article?.components.length

        setIsDisabled(!isArticleExists)
    }, [articleUuId, article])

    return isDisabled
}
