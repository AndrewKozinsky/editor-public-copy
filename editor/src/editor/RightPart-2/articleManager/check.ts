import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from './articleManager';
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes';

/**
 * The function check can you insert a component into the target element
 * @param {Array} tempCompArr — components templates array
 * @param {Array} dataCompArr — array of data components
 * @param {String} targetDataCompId — a target data component id
 * @param {String} targetDataElemId — a target data element id
 */
export function canComponentPutInElement(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    dataCompArr: ArticleTypes.Components,
    targetDataCompId: ArticleTypes.DataCompId,
    targetDataElemId: ArticleTypes.DataElemId
) {
    // Get component template
    const dataComp = this.getComponent(dataCompArr, targetDataCompId)

    // Get element template
    const tempElem = this.getTempElemByDataCompIdAndDataElemId(
        dataCompArr, targetDataCompId, targetDataElemId, tempCompArr
    )

    // If element template has nested elements it is not allowed to set components
    const hasElemNestedElements = this.hasElemNestedElements(tempCompArr, dataComp.tempCompId, tempElem.tempElemId)
    if (hasElemNestedElements) return false

    // If element template has text property, that only text component is allowed there.
    if (tempElem.text) return false

    return true
}


/**
 * The function checks if $element in component template html-string has children
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 * @param {String} tempElemId — element template id
 */
export function hasElemNestedElements(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    tempElemId: TempCompTypes.TempElemId
) {
    // Get component template
    const tempComp =  this.getTemplate(tempCompArr, tempCompId)
    if (!tempComp) return true

    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(tempComp.code.html, 'text/html')
    const $component = doc.body.childNodes[0] as HTMLElement

    let $elem: HTMLElement = $component.closest(`[data-em-id=${tempElemId}]`)
    if (!$elem) $elem = $component.querySelector(`[data-em-id=${tempElemId}]`)
    if (!$elem) return true

    if ($elem.childElementCount) return true

    return false
}


/**
 * The function checks if I can make undo or redo history step
 * @param {String} step — step direction: undo OR redo
 * @param {Array} historyArr — articles history array
 * @param {Number} currentIdx — current history array index
 */
export function canMakeHistoryStep(
    this: typeof articleManager,
    step: 'undo' | 'redo',
    historyArr: StoreArticleTypes.HistoryItems,
    currentIdx: number
) {
    return (
        (step === 'undo' && currentIdx - 1 !== -1) ||
        (step === 'redo' && currentIdx + 1 < historyArr.length)
    )
}


/**
 * The function checks if an article is saved
 * @param historyStepWhenWasSave
 * @param historyCurrentIdx
 */
export function isArticleSave(
    this: typeof articleManager,
    historyStepWhenWasSave: number,
    historyCurrentIdx: number
) {
    return historyStepWhenWasSave === historyCurrentIdx
}
