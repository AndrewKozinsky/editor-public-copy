import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import htmlStringToObject, {HTMLObjArrType} from './htmlStringToObject'
import articleManager from '../../articleManager/articleManager'
import { putRepeatedElems } from './putRepeatedElems'
import { getConsistObjsArr } from './getConsistObjsArr'
import { changeTagName } from './changeTagName'
import {setExtraAttribs} from './setExtraAttribs'
import { setAttribs } from './setAttribs'
import { insertChildren } from './insertChildren'


export function parseComponent(compData: ArticleTypes.Component, tempComps: TempCompTypes.TempComps): HTMLObjArrType.Tag {

    // Get component template by its tmpCompId
    let template = articleManager.getTemplate(tempComps, compData.tempCompId)

    // Get html string
    let htmlStr = template.code.html.trim()

    // Convert html string to html-object
    let htmlObjOriginal = htmlStringToObject(htmlStr)
    const htmlObj = htmlObjOriginal[0] as HTMLObjArrType.Tag

    // Based on information from dataComp I will find elements that should have duplicates and put they into html-object.
    putRepeatedElems(htmlObj, compData)

    // Array of objects consists of objects with correspondence between component template, data and html-object
    const consistObjs = getConsistObjsArr(template, compData, htmlObj)

    // If component didn't have elements set additional attributes and return htmlObj
    if (!consistObjs) {
        // Set dataCompId (component data id) to the root tag
        htmlObj.attrs['data-em-data-comp-id'] = compData.dataCompId.toString()
        return htmlObj
    }

    for(let consistObj of consistObjs) {
        changeTagName(consistObj)
        setExtraAttribs(consistObj)
        setAttribs(consistObj)
        insertChildren(consistObj, tempComps)
    }

    return htmlObj
}
