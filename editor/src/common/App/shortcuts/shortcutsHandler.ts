import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import {
    checkPressedKeys,
    getPressedKeys,
    PressedKeysObj
} from './getPressedKeys'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


export default function setShortcutsHandler() {
    document.addEventListener('keydown', shortcutsHandler)
}


/**
 * Обработчик нажатий клавиш
 * @param {Object} e — объект события
 */
function shortcutsHandler(e: KeyboardEvent) {

    // Object of pressed keys
    const pressedKeys = getPressedKeys(e)

    // Close modal window
    closeModal(pressedKeys)

    // Making undo or redo history step in article
    undoRedoArticleHistory(pressedKeys)
}


// Close modal window if you press Esc
function closeModal(pressedKeys: PressedKeysObj) {
    if ( checkPressedKeys(pressedKeys, ['esc']) && store.getState().modal.isOpen) {
        store.dispatch( actions.modal.closeModal() )
    }
}


// If you pressed Cmd + Z or Shift + Cmd + Z, then make undo or redo history step in article
function undoRedoArticleHistory(pressedKeys: PressedKeysObj) {

    // Return the function if user is not on the article page
    if (store.getState().settings.mainTab !== 1) return

    const { history, historyCurrentIdx } = store.getState().article

    if (checkPressedKeys(pressedKeys, ['cmd', 'z'])) {
        const canMakeStep = articleManager.canMakeHistoryStep('undo', history, historyCurrentIdx)
        if (!canMakeStep) return

        store.dispatch( actions.article.makeHistoryStep('undo') )
    }
    else if (checkPressedKeys(pressedKeys, ['cmd', 'shift', 'z'])) {
        const canMakeStep = articleManager.canMakeHistoryStep('redo', history, historyCurrentIdx)
        if (!canMakeStep) return

        store.dispatch( actions.article.makeHistoryStep('redo') )
    }
}
