import { getElementPadding } from 'utils/domUtils'
import {CoordsObjType} from './usePassFlashElemsCoordsToIFrame'


/**
 * The function sets visibility, size and position for flashed rectangle
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — type of a flashed rectangle: hover or select
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
export function setSizeAndPosition(
    $body: HTMLBodyElement,
    type: 'hover' | 'select',
    rectCoords: CoordsObjType,
    $flashRect: HTMLElement,
) {

    // 1. Get element by coordinates
    const articleElement = getArticleElementByCoordinates($body, rectCoords)

    // Hide flashed rectangle if a element didn't found
    if (!articleElement) {
        hideRect(type, $flashRect)
        return
    }

    // 2. Get the article element rectangle coordinates
    const coords = getCoordinates(articleElement, type, rectCoords)

    // 3. Set coordinates to the rectangle coordinates
    positionFlashRect($flashRect, coords, rectCoords)
}

/**
 * The function finds element by dataCompId, dataElemId and type
 * @param {HTMLBodyElement} $body — <body>
 * @param rectCoords
 */
function getArticleElementByCoordinates($body: HTMLBodyElement, rectCoords: CoordsObjType): null | HTMLElement {
    // Return null if cursor is not on component/element
    if (!rectCoords.dataCompId && rectCoords.dataElemId) return null

    // Create query string to find component/element under cursor
    let queryStr = `[data-em-data-comp-id="${rectCoords.dataCompId}"]`
    if (rectCoords.dataElemId) queryStr += `[data-em-data-elem-id="${rectCoords.dataElemId}"]`
    else queryStr += `:not([data-em-data-elem-id])`

    if (rectCoords.type === 'textComponent') {
        queryStr = `[data-em-text-data-comp-id="${rectCoords.dataCompId}"]`
    }

    // Return a founded element
    return $body.querySelector(queryStr)
}

/**
 * The function hides element by style
 * @param type
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
function hideRect(type: 'hover' | 'select', $flashRect: HTMLElement) {
    $flashRect.style.display = 'none'
}

/**
 * The function returns coordinates of flashed rectangle depending on flashed element in article
 * @param {HTMLElement} articleElement — flashed element in article
 * @param {String} type — type of a flashed rectangle: hover or select
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 */
function getCoordinates(
    articleElement: HTMLElement, type: 'hover' | 'select', rectCoords: CoordsObjType
): coordsObjType{
    // Get flashed an element's coordinates object
    const coords = articleElement.getBoundingClientRect()

    // Offset from flashed element in article to flashed rectangle depends on type
    const offset = type === 'hover' ? 2 : 4

    // Get paddings of flashed element in article.
    // If flashed element is a text component, so need to take away parent's padding.
    let paddings = { left: 0, top: 0, right: 0, bottom: 0 }
    if (rectCoords.type === 'textComponent') {
        paddings = getElementPadding(articleElement)
    }

    return {
        top: coords.top - offset + (paddings.top) + 'px',
        left: coords.left - offset + (paddings.left) + 'px',
        width: coords.width + offset - (paddings.left + paddings.right) + 'px',
        height: coords.height + offset - (paddings.top + paddings.bottom) + 'px'
    }
}

type coordsObjType = {
    top: string
    left: string
    width: string
    height: string
}

/**
 * The function sets visibility, size and position to flashed rectangle
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 * @param {Object} coords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 */
function positionFlashRect($flashRect: HTMLElement, coords: coordsObjType, rectCoords: CoordsObjType) {
    // Make rectangle visible
    $flashRect.style.display = 'block'

    // Set red color to border if it is a text component
    $flashRect.style.borderColor = (rectCoords.type === 'textComponent') ? 'rgb(255, 99, 71)' : ''

    //Set coordinates to an element
    $flashRect.style.top = coords.top
    $flashRect.style.left = coords.left
    $flashRect.style.width = coords.width
    $flashRect.style.height = coords.height
}
