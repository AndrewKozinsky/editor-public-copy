import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import {setSizeAndPosition} from './setSizeAndPosition'


/**
 * The hooks creates Observers to watch for a hoverrectcoords and a selectrectcoords element attribute
 */
export function useChangeFlashElementsPosition() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)

    const [observersHaveBeenSet, setObserversHaveBeenSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || observersHaveBeenSet || !history.length) return

        // Links of flashed rectangles
        const hoverRect = $links.$body.querySelector('[data-em-hover-rect]')
        const selectRect = $links.$body.querySelector('[data-em-select-rect]')

        // Set Observers to watch attributes changing on the body
        // and to correct flashed rectangles visibility, size and position
        observeReactCoordsProps($links.$body, 'hover', hoverRect)
        observeReactCoordsProps($links.$body, 'select', selectRect)

        // Set the flag that Observers were set.
        setObserversHaveBeenSet(true)
    }, [$links, observersHaveBeenSet, history])

    useEffect(function () {
        if (!$links.$body || history.length) return

        // Set the flag that Observers were set.
        setObserversHaveBeenSet(false)
    }, [$links, observersHaveBeenSet, history])
}

/**
 * The function creates an Observer to watch attributes changing on the body
 * It runs a function to correct flashed rectangles visibility, size and position
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — type of a flashed rectangle: hover or select
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
function observeReactCoordsProps($body: HTMLBodyElement, type: 'hover' | 'select', $flashRect: HTMLElement) {

    const observer = new MutationObserver((mutationRecords) => {
        // Get string with coordinates of the flashed element in an article
        // @ts-ignore
        const rectCoordsStr = $body.getAttribute(type + 'rectcoords')

        if (rectCoordsStr) {
            let rectCoords = JSON.parse(rectCoordsStr)
            // Correct flashed rectangles visibility, size and position
            setSizeAndPosition($body, type, rectCoords, $flashRect)
        }
    })

    observer.observe($body, {
        attributes: true, attributeFilter: [type + 'rectcoords']
    })
}
