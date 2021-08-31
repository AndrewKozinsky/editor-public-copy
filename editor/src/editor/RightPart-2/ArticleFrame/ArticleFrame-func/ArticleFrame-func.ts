import {useEffect} from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { AppStateType } from 'store/rootReducer'
import {MiscTypes} from 'types/miscTypes'
import {getFromLocalStorage} from 'utils/MiscUtils'
import { turnArticleDataToJSX } from '../../articleBuilder/articleBuilder'


// Hook sets article data in Store when IFrame rendered
export function useSetArticleDataInStore() {
    useEffect(function () {
        const articleData = getFromLocalStorage('article')
        if (!articleData) return

        store.dispatch(actions.article.fillArticle(
            articleData.siteId, articleData.incFilesId, articleData.articleId
        ))
    }, [])
}

/**
 * Hook gets links to IFrame window, document, head and body to Store when IFrame rendered
 * @param {Object} iFrameRef — reg to iFrame
 */
export function useSetIFrameElemsLinks(iFrameRef: MiscTypes.ReactRef) {
    useEffect(function () {
        if (!iFrameRef.current) return

        let $iFrame = iFrameRef.current as HTMLIFrameElement
        const $window = $iFrame.contentWindow
        const $document = $window.document
        const $head = $document.head
        const $body = $document.body as HTMLBodyElement

        // Set links to Store
        store.dispatch(actions.article.setLinks( $window, $document, $head, $body ))
    }, [iFrameRef.current])
}

/** Hook sets <div> in IFrame to put an article in */
export function useSetRootDivToIFrame() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)

    useEffect(function () {
        if (!$links.$body || history.length) return

        const rootDiv = document.createElement('div')
        $links.$body.append(rootDiv)
    }, [$links, history])
}

/** Hook sets article JSX to IFrame */
export function useSetArticleToIFrame() {
    const { $links, history, historyCurrentIdx, tempComps } = useSelector((store: AppStateType) => store.article)

    useEffect(function () {
        if (!$links.$body || !history.length) return

        const article = history[historyCurrentIdx].article

        // Создать JSX новой статьи и поставить в iFrame.
        ReactDOM.render(
            turnArticleDataToJSX(article, tempComps),
            $links.$body.firstChild
        )
    }, [history, tempComps, historyCurrentIdx])
}
