/**
 * The function check if passed element is match passed selector or has parent with passed selector
 * @param {HTMLElement} $targetElem — element with you need to check match to selecor
 * @param {String} selector — CSS selector
 */
export function hasElemParentWithSelector($targetElem: HTMLElement, selector: string) {
    let hasParent = false

    let currentParent = $targetElem
    for(;;) {
        if (currentParent.tagName.toLowerCase() === 'body') {
            break
        }

        if (currentParent.matches(selector)) {
            return true
        }
        currentParent = currentParent.parentElement
    }

    return hasParent
}