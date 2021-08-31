import {ConsistObj} from './getConsistObjsArr'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import { parseComponent } from './parseComponent'
import { HTMLObjArrType } from './htmlStringToObject'
import {parseText} from '../parseText/parseText'


/**
 *
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 * @param tempComps
 */
export function insertChildren(consistObj: ConsistObj, tempComps: TempCompTypes.TempComps) {
    if (consistObj.dataElem.children?.length) {

        const parsedChildren: HTMLObjArrType.Arr = []

        for (let child of consistObj.dataElem.children) {
            if(child.type === 'component') {
                parsedChildren.push(parseComponent(child, tempComps))
            }
            else if(child.type === 'textComponent') {
                // Set additional attribute with text data component id
                // in order to get information about text component in element
                consistObj.htmlElem.attrs['data-em-text-data-comp-id'] = child.dataCompId.toString()

                const textComp = parseText(child, tempComps, child.tempElemId)
                parsedChildren.push(...textComp)
            }
        }

        consistObj.htmlElem.children = parsedChildren
    }
}
