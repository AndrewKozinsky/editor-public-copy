import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'

/** The hooks sets flash rectangles into IFrame */
export function useInstallFlashElements() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)

    // Were flash elements installed?
    const [wereInstalled, setWereInstalled] = useState(false)

    useEffect(function () {
        if (!$links.$body || !history.length || wereInstalled) return

        // Set style
        setExtraStyle($links.$head)

        // Install flash rectangles
        createFlashElement($links.$body,'hover')
        createFlashElement($links.$body,'select')

        // Set the flag that flash elements were installed so as not to do it again
        setWereInstalled(true)
    }, [$links, wereInstalled, history])

    useEffect(function () {
        if (!history.length) {
            // Set flag that files are not set
            setWereInstalled(false)
        }
    }, [history])
}

/**
 * The function set CSS to manage Empty text sign visibility
 * @param {HTMLHeadElement} $head — <head>
 */
function setExtraStyle($head: HTMLHeadElement) {
    // Flash rectangles style
    const style = `.em-flash-rect {display: none;position: absolute;width: 100px;height: 100px;pointer-events: none;box-sizing: content-box;border-radius: 2px;}.em-flash-rect__hover {top: 50px;left: 50px;border: 1px solid rgba(1, 122, 255, 1);}.em-flash-rect__select {top: 250px;left: 250px;border: 2px solid rgba(1, 122, 255);}`

    // Create and set <div> into <body>
    const styleElem = document.createElement('style')
    styleElem.innerText = style
    $head.appendChild(styleElem)
}

/**
 * The function creates a flash rectangle element and appends it in the <body>
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — flash rectangle type: hover or select
 */
function createFlashElement($body: HTMLBodyElement, type: 'hover' | 'select') {
    const flashRect = document.createElement('div')

    // Add attribute data-em-hover-rect OR data-em-select-rect
    // to find it in an another function
    const typeWithFirstBigLetter = type.slice(0, 1).toUpperCase() + type.slice(1)
    flashRect.dataset[`em${typeWithFirstBigLetter}Rect`] = 'true'

    // Add classes
    flashRect.classList.add('em-flash-rect')
    // Add specific class (em-flash-rect__hover OR em-flash-rect__select)
    flashRect.classList.add('em-flash-rect__' + type)

    // Append a flash rectangle to the <body>
    $body.appendChild(flashRect)
}
