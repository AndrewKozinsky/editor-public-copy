import {ConsistObj} from './getConsistObjsArr'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'

/**
 * The function set a tag name to html element if it necessary
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export function changeTagName(consistObj: ConsistObj) {
    const tagName = getTagName(consistObj.dataElem, consistObj.tempElem)
    if (tagName) consistObj.htmlElem.tag = tagName
}

/**
 * Get tag name from dataElem
 * @param {Object} dataElem — element data object
 * @param {Object} tempElem — template element object
 */
function getTagName(dataElem: ArticleTypes.ComponentElem, tempElem: TempCompTypes.Elem) {
    if (!dataElem.tag) return null

    // If tag is a string, that is a ready tag name.
    if (typeof dataElem.tag === 'string') return dataElem.tag

    // Otherwise tag id was passed. That's why I need to find tag name with this id in the component template...
    // Its tags
    const tags = tempElem.tags.values
    // Get tag object by tag id
    const tagData = tags.find(tagObj => tagObj.id === dataElem.tag)
    // Return tag name
    return tagData.name
}
