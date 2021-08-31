import React, {useRef} from 'react'
import {
    useSetArticleDataInStore,
    useSetIFrameElemsLinks,
    useSetRootDivToIFrame,
    useSetArticleToIFrame,
} from './ArticleFrame-func/ArticleFrame-func'
import { useSetUserScriptsAndStylesToIFrame } from './ArticleFrame-func/setUserScriptsAndStyles'
import { useManageEmptyTextSign } from './ArticleFrame-func/useManageEmptyTextSign'
import {useInstallFlashElements} from './flashElements/useInstallFlashElements'
import { useSetMouseHandlersForFlashRects } from './flashElements/useSetMouseHandlersForFlashRects'
import { usePassFlashElemsCoordsToIFrame } from './flashElements/usePassFlashElemsCoordsToIFrame'
import {useChangeFlashElementsPosition} from './flashElements/useChangeFlashElementsPosition'
import { useRemoveUnwantedFocus } from './ArticleFrame-func/useRemoveUnwantedFocus'
import { useCleanIFrame } from './ArticleFrame-func/useCleanIFrame'
import './ArticleFrame.scss'


export default function ArticleFrame() {
    const windowRef = useRef(null)

    // Clean the iframe if an article was cleaned
    useCleanIFrame()

    // Hook sets article data in Store when IFrame rendered
    useSetArticleDataInStore()

    // Hook sets links to IFrame window, document, head and body to Store when IFrame rendered
    useSetIFrameElemsLinks(windowRef)

    // Hook sets user's scripts and styles to IFrame
    useSetUserScriptsAndStylesToIFrame()

    // Hook manages Empty text sign visibility
    useManageEmptyTextSign()

    // Hook sets <div> in IFrame to put an article in
    useSetRootDivToIFrame()

    // Hook sets article JSX to IFrame
    useSetArticleToIFrame()

    // Set and control hovered and selected rectangles in IFrame
    useInstallFlashElements()
    useSetMouseHandlersForFlashRects()
    usePassFlashElemsCoordsToIFrame()
    useChangeFlashElementsPosition()

    // If a user clicks on a element containing a text component, it will get the focus.
    // The hook sets a click handler removes unwanted focus.
    useRemoveUnwantedFocus()

    return <iframe className="article-frame" ref={windowRef} />
}
