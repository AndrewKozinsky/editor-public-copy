import {HTMLObjArrType} from './htmlStringToObject'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import {createDeepCopy} from 'src/utils/MiscUtils'

/**
 * Function synchronize the number of elements in html object with number of elements in component data
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function putRepeatedElems(htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component) {
    if (!dataComp.elems) return

    // Create object like { 'banner-group': [...], 'cell-group': [...] }.
    // Key is a data element group name (elemGroup property), value is an array of objects with element data
    let compElemsGroups = getCompElemsGroups(dataComp)

    // Go through the objects in the compElemsGroups array...
    for (let elemGroupObj of compElemsGroups) {
        // Set elems duplicates based on elemGroupObj into htmlObj
        setDuplicateElemWithEmId(htmlObj, elemGroupObj)
    }
}


type ElemsGroupsType = ElemsGroupType[]
type ElemsGroupType = {elemGroup: string, elemId: string, elems: ArticleTypes.ComponentElems}

/**
 * The function forms array of objects like { 'banner-group': [...], 'cell-group': [...] }.
 * A key is a data element group name (elemGroup property), value is an array of objects with element data
 * @param {Object} dataComp — element data object
 */
function getCompElemsGroups(dataComp: ArticleTypes.Component) {
    const groupsArr: ElemsGroupsType = []

    for (let dataElem of dataComp.elems) {

        // Find the objects with the same elemGroup prop in groupsArr as in the dataElem
        const objWithThisElemGroup = groupsArr.find(groupObj => groupObj.elemGroup === dataElem.elemGroup)

        // If a such object is exists...
        if (objWithThisElemGroup) {
            // Push dataElem to the elems array
            objWithThisElemGroup.elems.push(dataElem)
        }
        else {
            // Create a new object with the group name and elems array consists of objects with the same group
            groupsArr.push({
                elemGroup: dataElem.elemGroup,
                elemId: dataElem.tempElemId,
                elems: [dataElem]
            })
        }
    }

    return groupsArr
}


/**
 * The function sets a few elements duplicated to htmlObj depends on information in elemGroupObj
 * @param {Object} htmlObj — a html-object
 * @param {Number} elemGroupObj — an object like {elemGroup: 'some-group-name', elems: [dataElemObj,...]
 * @returns {*}
 */
function setDuplicateElemWithEmId(htmlObj: HTMLObjArrType.Tag, elemGroupObj: ElemsGroupType) {

    // If there is an attribute data-em-group in root component tag with passed group name...
    if (htmlObj.attrs['data-em-group'] === elemGroupObj.elemGroup && htmlObj.attrs['data-em-id'] === elemGroupObj.elemId) {
        // Find an elem data with the same group name
        const elemData = elemGroupObj.elems.find(el => el.elemGroup === elemGroupObj.elemGroup)
        // Set attribute with data elem id to htmlObj
        htmlObj.attrs['data-em-data-elem-id'] = elemData.dataElemId.toString()
    }

    if (!htmlObj.children) return false

    // Go though children elements...
    for (let i = 0; i < htmlObj.children.length; i++) {

        let childObj = htmlObj.children[i]

        // Don't process text elements
        if ('text' in childObj) continue

        // If there is an attribute data-em-group in element tag with passed group name...
        if (childObj.attrs['data-em-group'] === elemGroupObj.elemGroup && childObj.attrs['data-em-id'] === elemGroupObj.elemId) {

            // Made an array of copies of html-elements
            let arr = elemGroupObj.elems.map(groupElem => {
                const childObjCopy = <HTMLObjArrType.Tag>createDeepCopy(childObj)
                // Set attribute with data elem id to htmlObj
                childObjCopy.attrs['data-em-data-elem-id'] = groupElem.dataElemId.toString()
                return childObjCopy
            })

            // Set array's elements into children array
            htmlObj.children.splice(i, 1, ...arr)
            // Return true because copies were set
            return true
        }
        // If tag doesn't have data-em-group attribute with passed group name...
        else {
            if (!childObj.children) continue

            for (let i = 0; i < childObj.children.length; i++) {

                // If elements copies were set?
                let hasProcessed = false
                if ('tag' in childObj) {
                    hasProcessed = setDuplicateElemWithEmId(childObj, elemGroupObj)
                }
                // If copies were set don't go further
                if (hasProcessed) break
            }
        }
    }
}
