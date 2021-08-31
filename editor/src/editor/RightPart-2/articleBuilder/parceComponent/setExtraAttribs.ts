import { ConsistObj } from './getConsistObjsArr'

/**
 * Setting a dataCompId attribute to root tag
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export function setExtraAttribs(consistObj: ConsistObj) {
    // Set dataCompId (component data id) to the root tag
    consistObj.htmlComp.attrs['data-em-data-comp-id'] = consistObj.dataComp.dataCompId.toString()
    // Set dataCompId (component data id) to the element tag
    consistObj.htmlElem.attrs['data-em-data-comp-id'] = consistObj.dataComp.dataCompId.toString()
}
