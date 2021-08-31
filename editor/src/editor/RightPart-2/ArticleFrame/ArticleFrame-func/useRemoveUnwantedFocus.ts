import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import {isCursorOnTextComponent, isTextCompAhead} from '../flashElements/useSetMouseHandlersForFlashRects'


/** The hook doesn't allow to set focus while user clicks on no text components. */
export function useRemoveUnwantedFocus() {
    const { $links, history } = useSelector((store: AppStateType) => store.article)

    // Were mouse move handler set?
    const [mouseClickHandlerSet, setMouseClickHandlerSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || mouseClickHandlerSet || !history.length) return

        $links.$document.addEventListener('mousedown', mouseHandler)

        // Set flag that handlers were set
        setMouseClickHandlerSet(true)
    }, [$links, mouseClickHandlerSet, history])
}

/**
 * OnMouseDown handler.
 * The function defines was a click on text component or element.
 * If a click was on a element, it doesn't allow to set focus.
 * @param {Event} event — event object
 */
function mouseHandler(event: MouseEvent) {
    // Element under cursor
    const target = event.target as HTMLElement

    // Check if there is a text component under cursor.
    if (isTextCompAhead(target)) {
        // Text component doesn't have own wrapper. That's why it always is inside element.
        // An element can have padding.
        // The function defines if cursor on a text component or on element's padding
        const cursorOnTextComponent = isCursorOnTextComponent(event, target)

        // It cursor is not on text component...
        if (!cursorOnTextComponent) {
            // Cancel click
            event.preventDefault()
            // Remove focus if is there
            target.blur()
        }
    }
}
