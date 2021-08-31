import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import articleManager from './articleManager'

export function createArticle(): ArticleTypes.Article {
    return {
        meta: {
            maxComponentId: 0
        },
        components: []
    }
}

/**
 * The function creates a new component data with passed tempCompId
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 */
export function createComponent(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId
) {
    const tempComp = this.getTemplate(tempCompArr, tempCompId)

    let maxCompId = article.meta.maxComponentId

    const compData: ArticleTypes.Component = {
        type: 'component',
        dataCompId: ++maxCompId,
        tempCompId: tempComp.uuid
    }

    const elementsFnResult = createCompElements(tempComp, maxCompId)
    if (elementsFnResult.compElems) {
        compData.elems = elementsFnResult.compElems
        maxCompId = elementsFnResult.maxCompId
    }

    return {
        compData,
        maxCompId
    }
}

/**
 * The function creates elements in a new component
 * @param {Object} tempComp — a component template
 * @param {Number} maxCompId — a maximum component id in an article
 */
function createCompElements(tempComp: TempCompTypes.TempComp, maxCompId: number) {
    let newMaxCompId = maxCompId

    if (!tempComp.code.elems?.length) {
        return {
            compElems: null,
            maxCompId: newMaxCompId
        }
    }

    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(tempComp.code.html, 'text/html')
    const $component = doc.body.childNodes[0] as HTMLElement

    const newElemsArr = tempComp.code.elems.map((tempElem, i) => {

        let $elem: HTMLElement = $component.closest(`[data-em-id=${tempElem.tempElemId}]`)
        if (!$elem) $elem = $component.querySelector(`[data-em-id=${tempElem.tempElemId}]`)

        const elementGroupName = $elem.dataset.emGroup

        const newElemData: ArticleTypes.ComponentElem = {
            dataElemId: i + 1,
            tempElemId: tempElem.tempElemId,
            elemGroup: elementGroupName
        }

        const elemAttrs = createElemAttribs(tempElem)
        if (elemAttrs) newElemData.attribs

        if (tempElem.hidden) {
            newElemData.layer = {
                hidden: true
            }
        }

        if (tempElem.text) {
            newMaxCompId++
            const res = createNewTextComponent(tempComp, tempElem, newMaxCompId)
            newElemData.children = [ res ]
        }

        return newElemData
    })

    return {
        compElems: newElemsArr,
        maxCompId: newMaxCompId
    }
}

/**
 * The function creates attributes object in a element
 * @param {Object} tempElem — a template element object
 */
function createElemAttribs(tempElem: TempCompTypes.Elem): null | ArticleTypes.Attribs {
    if (!tempElem.attribs?.keys.length) return null

    const attribsArr: ArticleTypes.Attribs = []

    for (let attribTemp of tempElem?.attribs) {
        let attribData: ArticleTypes.Attrib

        if (attribTemp.view === 'text') {
            attribData = {id: attribTemp.id, value: ''}
        } else {
            attribData = {id: attribTemp.id, value: []}
        }

        if (attribTemp.values?.length) {
            for (let tempValue of attribTemp.values) {
                if (tempValue.checked) {
                    if (attribTemp.view === 'text') {
                        attribData.value = attribData.value + ' ' + tempValue.value
                    }
                    else {
                        if (Array.isArray(attribData.value)) {
                            attribData.value.push(tempValue.id)
                        }
                    }
                }
            }
        }

        if (attribTemp.view === 'text') {
            if (attribData.value) attribsArr.push(attribData)
        }
        else {
            if (Array.isArray(attribData.value)) {
                if (attribData.value.length) attribsArr.push(attribData)
            }
        }
    }

    return attribsArr
}

/**
 * The function creates an empty text component
 * @param {Object} tempComp — a component template
 * @param {Object} tempElem — a template element object
 * @param {Number} dataCompId — component id
 */
function createNewTextComponent(
    tempComp: TempCompTypes.TempComp, tempElem: TempCompTypes.Elem, dataCompId: number
): ArticleTypes.TextComponent {
    return {
        type: 'textComponent',
        dataCompId: dataCompId,
        tempCompId: tempComp.uuid,
        tempElemId: tempElem.tempElemId,
        children: [
            {type: 'text', text: ''}
        ]
    }
}
