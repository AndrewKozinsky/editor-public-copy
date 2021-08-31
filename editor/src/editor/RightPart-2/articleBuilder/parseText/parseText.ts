import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import {HTMLObjArrType} from '../parceComponent/htmlStringToObject'
import articleManager from '../../articleManager/articleManager'
import {parseComponent} from '../parceComponent/parseComponent'

/**
 * The function turns text component data to html-object
 * @param {Object} compData — component data
 * @param {Array} tempComps — an array of component templates
 * @param {String} tempElemId — element template id
 */
export function parseText(
    compData: ArticleTypes.TextComponent, tempComps: TempCompTypes.TempComps, tempElemId: TempCompTypes.TempElemId
): HTMLObjArrType.Arr {
    // Get component template and element template by its tmpCompId
    const template = articleManager.getTemplate(tempComps, compData.tempCompId)
    const elemTemplate = template.code.elems.find(elem => elem.tempElemId === tempElemId)

    // Form html-object from text component data and return it
    return getTextParts(compData.children, tempComps, elemTemplate)
}

/**
 * The recursive function turns text component data to html-object
 * @param {Array} children — array with data of text component
 * @param {Array} tempComps — array of components template
 * @param {Object} elemTemplate — element template
 */
function getTextParts(
    children: ArticleTypes.TextChildren, tempComps: TempCompTypes.TempComps, elemTemplate: TempCompTypes.Elem
) {

    return children.map(elemData => {
        if (elemData.type === 'text') {
            return {
                text: elemData.text
            }
        }
        else if (elemData.type === 'textTag') {

             const obj: HTMLObjArrType.Tag = {
                tag: getTag(elemData, elemTemplate),
            }

            const attrs = getAttrs(elemData, tempComps, elemTemplate)
            if (attrs) obj.attrs = attrs

            const children = getChildren(elemData.children, tempComps, elemTemplate)
            if (children) obj.children = children

            return obj
        }
        else if (elemData.type === 'component') {
            return parseComponent(elemData, tempComps)
        }
    })
}

/**
 * The function returns tag name of the text component
 * @param {Object} elemData — a tag component data
 * @param {Object} elemTemplate — element template
 */
function getTag(elemData: ArticleTypes.TextChild, elemTemplate: TempCompTypes.Elem) {
    if (elemData.type !== "textTag") return ''

    const tagId = elemData.tag
    const tagObj = elemTemplate.text.tags.find(tagObj => tagObj.id === tagId)

    return tagObj.name
}

/**
 * The function returns attributes object
 * @param {Object} elemData — element data object
 * @param {Array} tempComps — an array of component templates
 * @param {Object} elemTemplate — element template
 */
function getAttrs(elemData: ArticleTypes.TagObject, tempComps: TempCompTypes.TempComps, elemTemplate: TempCompTypes.Elem) {
    // An object with attributes values of some tag
    const readyAttrs: HTMLObjArrType.Attrs = {}

    // Go through attribs describes in element template
    elemTemplate.text.attribs.forEach(tempAttrObj => {
        // Attribute name
        const attrName = tempAttrObj.name
        // Attribute values
        const attrValues = []

        // If there is locked value, put it in values array
        if (tempAttrObj.lockedValue) {
            attrValues.push(tempAttrObj.lockedValue)
        }

        // If any attributes are assigned in data...
        if (elemData.attribs?.length) {

            // Go through attribs array of data objects
            for (let attrObj of elemData.attribs) {
                // If the attribute id is equal of current one...
                if (tempAttrObj.id === attrObj.id) {
                    // Go through data attrib values ids and get value attribute id from data
                    for (let attrId of attrObj.value) {
                        // Get attribute object by attribute value id in template
                        const attrValueObj = tempAttrObj.values.find(valObj => valObj.id === attrId)
                        // Set attribute value to values array
                        attrValues.push(attrValueObj.value)
                    }
                }
            }
        }

        // If attribute has got value
        if (attrValues.length) {
            // Join attribute values and set into tag attribute object
            readyAttrs[attrName] = attrValues.join(' ')
        }
    })

    return readyAttrs
}

/**
 * The function returns tag's children
 * @param {Array} children — array with data of text component
 * @param {Array} tempComps — an array of component templates
 * @param {Object} elemTemplate — element template
 */
function getChildren(children: ArticleTypes.TextChildren, tempComps: TempCompTypes.TempComps, elemTemplate: TempCompTypes.Elem) {
    if (!children) return
    return getTextParts(children, tempComps, elemTemplate)
}
