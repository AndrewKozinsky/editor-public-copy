import {useSelector} from 'react-redux'
import {AppStateType} from 'src/store/rootReducer'
import {useEffect, useState} from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'

export const hooks = {
    getHistoryItem: useGetHistoryItem,
    getArticle: useGetArticle,
    getFlashedElemCoords: useGetFlashedElemCoords
}

/** Hook returns current history item object */
function useGetHistoryItem() {
    // Templates component from the Store
    const { history, historyCurrentIdx } = useSelector((store: AppStateType) => store.article)
    const [currentItem, setCurrentItem] = useState<null | StoreArticleTypes.HistoryItem>(null)

    useEffect(function () {
        if (!history) return

        const item = history[historyCurrentIdx]
        setCurrentItem(item)
    }, [history, historyCurrentIdx])

    return currentItem
}

/** Hook returns current article */
function useGetArticle() {
    const historyItem = useGetHistoryItem()
    const [article, setArticle] = useState<null | ArticleTypes.Article>(null)

    useEffect(function () {
        if (!historyItem) return

        setArticle(historyItem.article)
    }, [historyItem])

    return article
}


type FlashedElemsCoords = {
    hoveredElem: StoreArticleTypes.HoveredElem
    selectedElem: StoreArticleTypes.HoveredElem
}

/** Hook returns object with coordinated hovered and selected component/element */
function useGetFlashedElemCoords() {
    const historyItem = useGetHistoryItem()
    const [flashedElemsCoords, setFlashedElemsCoords] = useState<null | FlashedElemsCoords>(null)

    useEffect(function () {
        if (!historyItem) return

        setFlashedElemsCoords({
            hoveredElem: historyItem.hoveredElem,
            selectedElem: historyItem.selectedElem
        })
    }, [historyItem])

    return flashedElemsCoords
}
