import {ConsistObj} from './getConsistObjsArr'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import { HTMLObjArrType } from './htmlStringToObject'

/**
 * Set the assigned attributes to element
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export function setAttribs(consistObj: ConsistObj) {
    // Set attributes
    if (consistObj.tempElem.attribs) {
        for (let attrTemplate of consistObj.tempElem.attribs) {
            // Set an attribute to element
            setAttribToHtmlElem(attrTemplate, consistObj.dataElem, consistObj.htmlElem)
        }
    }
}

/**
 * Set an attribute to element
 * @param {Object} attrTemplate — attr object from element template
 * @param {Object} dataElem — element data object
 * @param {Object} htmlElem — html-element object
 */
function setAttribToHtmlElem(attrTemplate: TempCompTypes.ElemAttrib, dataElem: ArticleTypes.ComponentElem, htmlElem: HTMLObjArrType.Tag) {
    const attrName = attrTemplate.name

    // Array with the attribute values
    let attrValue: string[] = []
    // Set locked value if it exists
    if (attrTemplate.lockedValue) attrValue.push(attrTemplate.lockedValue)

    // If there are attributes in element data...
    if (dataElem.attribs?.length) {

        // Find object with current attribute data
        // Something like {id: 1, value: [1]} where id is an attrib id from elem template,
        // and value is array of ids of an attrib values from elem template. Instead of array of ids may be string with exact value
        const dataElemAttr = dataElem.attribs.find(dataElemAttrib => dataElemAttrib.id === attrTemplate.id)

        if (dataElemAttr) {
            // If in dataElemAttr.value is ready value...
            if (typeof dataElemAttr.value === 'string') {
                attrValue.push(dataElemAttr.value)
            }
            // If in dataElemAttr.value is array of values ids...
            else if(Array.isArray(dataElemAttr.value)) {
                // Go through all ids and get string values
                for(let dataElemAttrValueId of dataElemAttr.value) {
                    const attrValue2 = attrTemplate.values.find(v => v.id === dataElemAttrValueId)
                    attrValue.push(attrValue2.value)
                }
            }

        }
    }

    // Join all attributes values to a string
    htmlElem.attrs[attrName] = attrValue.join(' ')
}
