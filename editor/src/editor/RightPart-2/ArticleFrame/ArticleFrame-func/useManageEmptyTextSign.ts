import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'


/** Hook manages Empty text sign visibility */
export function useManageEmptyTextSign() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)
    // Did event handler has set?
    const [handlerHasSet, setHandlerHasSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || !history.length || handlerHasSet) return

        // There is need to set tabIndex attribute to get focus event because <body> cannot get focus.
        // I catch focus on contentEditable elements in body
        $links.$body.tabIndex = 1

        // Set style
        setExtraStyle($links.$head)

        // Set focus and blur handlers
        // Timeout is needed because iFrame content have not rendered yet by this time
        setTimeout(() => setHandlers($links.$document), 0)

        setHandlerHasSet(true)
    }, [$links, history, handlerHasSet])
}

/**
 * The function set CSS to manage Empty text sign visibility
 * @param {HTMLHeadElement} $head — <head>
 */
function setExtraStyle($head: HTMLHeadElement) {
    const style = `
    empty-text-sign {
        opacity: .4;
        transition: opacity .25s;
    }
    
    p:hover > empty-text-sign {
        opacity: 0.85;
    }
    `

    const styleElem = document.createElement('style')
    styleElem.innerText = style
    $head.appendChild(styleElem)
}

/**
 * The function set onFocus/onBlur handlers to <body>
 * @param {Document} $document
 */
function setHandlers($document: Document) {
    // Catch focus on <body> and hide Empty text sign in contentEditable element
    $document.body.addEventListener('focus', function (event) {
        hideTextSignElem(event, $document)
    }, true)

    // Catch blur on <body> and make visible all Empty texts
    $document.body.addEventListener('blur', function (event) {
        setVisibleToAllTextSignElems(event, $document)
    }, true)
}

/**
 * The function detects element on which the focus occurred and hides it
 * @param {Event} event — event object
 * @param {Document} $document — document object
 */
function hideTextSignElem(event: Event, $document: Document) {
    // Get contentEditable element on which the focus occurred
    //@ts-ignore
    let $elemWithTextComp = event.target.closest('[data-em-text-data-comp-id]')
    if (!$elemWithTextComp) return

    // Get Empty text sign element in contentEditable element
    const $emptyTextSign = $elemWithTextComp.querySelector('empty-text-sign')
    if (!$emptyTextSign) return

    // Hide it so it doesn't interfere with typing
    $emptyTextSign.style.display = 'none'

    // Set focus to contentEditable element because it was inside Empty text sign element
    $emptyTextSign.parentNode.focus()
}

/**
 * The function makes visible all Empty text sign elements
 * @param {Event} event — event object
 * @param {Document} $document — document object
 */
function setVisibleToAllTextSignElems(event: Event, $document: Document) {
    // Get all Empty text sign elements
    const $emptyTextSign = $document.querySelectorAll('empty-text-sign')
    if (!$emptyTextSign) return

    // Set them style display to make them visible
    for (let $sign of $emptyTextSign) {
        //@ts-ignore
        $sign.style.display = 'inline-block'
    }
}
