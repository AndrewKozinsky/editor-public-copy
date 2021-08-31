import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import {HTMLObjArrType} from './htmlStringToObject'

// type ConsistObjsArr = ConsistObj[]
export type ConsistObj = {
    dataComp: ArticleTypes.Component
    dataElem: ArticleTypes.ComponentElem
    tempElem: TempCompTypes.Elem
    htmlComp: HTMLObjArrType.Tag
    htmlElem?: HTMLObjArrType.Tag
}

/**
 * The function form an array of objects consists of objects with a correspondence between component template, data and html-object
 * @param {Object} template — component template
 * @param {Object} compData — component data
 * @param {Object} htmlObj — component html-object
 */
export function getConsistObjsArr(
    template: TempCompTypes.TempComp, compData: ArticleTypes.Component, htmlObj: HTMLObjArrType.Tag
): null | ConsistObjsArr {
    if (!compData.elems) return null

    return compData.elems.map(dataElem => {
        const partObject: ConsistObj = {
            dataComp: compData,
            dataElem: dataElem,
            tempElem: getTemplateElemByTempElemId(template, dataElem.tempElemId),
            htmlComp: htmlObj,
            htmlElem: getHtmlElem(htmlObj, dataElem.dataElemId, dataElem.elemGroup, dataElem.tempElemId)
        }

        return partObject
    })
}

/**
 * The function finds and returns element template based on an element template id
 * @param {Object} template — component template
 * @param {String} tempElemId — an element template id
 */
function getTemplateElemByTempElemId(template: TempCompTypes.TempComp, tempElemId: TempCompTypes.UuId): TempCompTypes.Elem {
    return template.code.elems.find(tempElem => tempElem.tempElemId === tempElemId)
}

/**
 * The function finds and returns html-element object with passed elemGroup name and tempElemId
 *  @param {Number} dataElemId — an element id
 * @param {Object} htmlObj — component html-object
 * @param {String} elemGroup — the name of the group to which the element belongs
 * @param {String} tempElemId — element template name
 */
function getHtmlElem(htmlObj: HTMLObjArrType.Tag, dataElemId: number, elemGroup: string, tempElemId: string): HTMLObjArrType.Tag {

    let htmlElem: HTMLObjArrType.Tag
    find(htmlObj)

    function find(htmlObj: HTMLObjArrType.Tag) {
        if ('text' in htmlObj) return

        // If there is attr with a passed tempElemId and a group name...
        if (htmlObj.attrs['data-em-id'] === tempElemId
            && htmlObj.attrs['data-em-group'] === elemGroup
            && htmlObj.attrs['data-em-data-elem-id'] === dataElemId.toString())
        {
            // The searches has finished
            htmlElem = htmlObj
            return
        }

        if (!htmlObj.children) return

        // Go through the children and find html-element there...
        for (let i = 0; i < htmlObj.children.length; i++) {

            let childObj = htmlObj.children[i]

            if ('text' in childObj) continue

            // If there is attr with a passed tempElemId and a group name...
            if (childObj.attrs['data-em-id'] === tempElemId
                && childObj.attrs['data-em-group'] === elemGroup
                && childObj.attrs['data-em-data-elem-id'] === dataElemId.toString()
            ) {
                // The searches has finished
                htmlElem = childObj
                return
            }
            else {
                if (childObj.children) {
                    find(childObj)
                }
            }
        }
    }

    return htmlElem
}
