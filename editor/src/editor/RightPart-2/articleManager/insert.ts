import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from './articleManager';
import ArticleTypes from 'store/article/codeType/articleCodeType'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'


export type CreateCompFnReturnType = {
    components: ArticleTypes.Components
    maxCompId: number
}


/**
 *
 * @param article
 * @param tempCompArr
 * @param tempCompId
 * @param targetDataCompId
 * @param targetDataElemId
 */
export function createCompAndSetInElem(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    targetDataCompId: ArticleTypes.DataCompId,
    targetDataElemId: ArticleTypes.DataElemId
): CreateCompFnReturnType {

    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    // Get element which I going to set the new component
    const targetElemData = this.getCompElem(article.components, targetDataCompId, targetDataElemId)

    // Create a new components array
    let updatedComponents: ArticleTypes.Components

    // If the target element has a children array, put a new component to it
    if (targetElemData.children) {
        // Set the new component into element children
        const elemChildrenArrCopy = [...targetElemData.children, newCompResult.compData]
        // Get updates components array
        updatedComponents = makeImmutableObj(article.components, targetElemData.children, elemChildrenArrCopy)
    }
    // If the target element doesn't have a children array, create and put a new component to it
    else {
        const newTargetElemData = {...targetElemData}
        newTargetElemData.children = [newCompResult.compData]

        // Get updates components array
        updatedComponents = makeImmutableObj(article.components, targetElemData, newTargetElemData)
    }

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}


/**
 * The function creates a new component and puts it before or after a passed component
 * @param {String} place — a place where to put a created component: before or after
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 * @param {String} targetDataCompId — a target data component id relative with the a new component will be placed
 */
export function createCompAndSetItNearComp(
    this: typeof articleManager,
    place: 'before' | 'after',
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    targetDataCompId: ArticleTypes.DataCompId
): CreateCompFnReturnType {
    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    const parentArray = this.getCompParentArray(article.components, targetDataCompId)

    // Get idx of the targetDataCompId in parent array
    const idx = parentArray.findIndex(compData => compData.dataCompId === targetDataCompId)

    // Put the new component before or ofter target component
    let parentArrayCopy = [...parentArray]
    if (place === 'before') {
        parentArrayCopy.splice(idx, 0, newCompResult.compData)
    }
    else if (place === 'after') {
        parentArrayCopy.splice(idx + 1, 0, newCompResult.compData)
    }

    // Create a new components array
    let updatedComponents: ArticleTypes.Components
    if (parentArray === article.components) updatedComponents = parentArrayCopy
    else updatedComponents = makeImmutableObj(article.components, parentArray, parentArrayCopy)

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}


/**
 * The function creates a new component and puts it in the end of the article
 * @param {String} place — a place where to put a created component
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 */
export function createCompAndSetInRootOfArticle(
    this: typeof articleManager,
    place: 'begin' | 'end',
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
): CreateCompFnReturnType {
    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)

    // Put the new component in the beginning OR to the end of components array
    const artCompsArr = [...article.components]
    if (place === 'begin') artCompsArr.unshift(newCompResult.compData)
    else if (place === 'end') artCompsArr.push(newCompResult.compData)

    return {

        components: artCompsArr,
        maxCompId: newCompResult.maxCompId
    }
}
