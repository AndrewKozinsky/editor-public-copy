import {
    createCompAndSetItNearComp,
    createCompAndSetInElem,
    createCompAndSetInRootOfArticle
} from './insert'
import {
    deleteArticle,
    saveArticle,
    supplementArtMarksInLocalStorage
} from './misc'
import {
    getCurrentHistoryItem,
    getComponent,
    getCompElem,
    getTempCompByDataCompId,
    getTempElemByDataCompIdAndDataElemId,
    getTemplate,
    getTemplateElement,
    getCompParentArray
} from './gettingResources'
import { hooks } from './hooks'
import {
    createArticle,
    createComponent
} from './create';
import {
    canComponentPutInElement,
    hasElemNestedElements,
    canMakeHistoryStep,
    isArticleSave
} from "./check"


class ArticleManager {
    // GETTING RESOURCES
    // Finds current history item object
    getCurrentHistoryItem = getCurrentHistoryItem
    // Finds template in templates array
    getTemplate = getTemplate
    // Finds element template in templates array
    getTemplateElement = getTemplateElement
    // Finds template in templates array
    getComponent = getComponent
    // Finds element template in templates array
    getCompElem = getCompElem
    // Finds component template by data component id
    getTempCompByDataCompId = getTempCompByDataCompId
    // Finds element template by data component id and data element id
    getTempElemByDataCompIdAndDataElemId = getTempElemByDataCompIdAndDataElemId
    // Finds an array in witch component is
    getCompParentArray = getCompParentArray

    // CHECK
    // The method returns boolean can passed component put in element
    canComponentPutInElement = canComponentPutInElement
    hasElemNestedElements = hasElemNestedElements
    canMakeHistoryStep = canMakeHistoryStep
    isArticleSave = isArticleSave

    // CREATE
    createArticle = createArticle
    createComponent = createComponent

    // INSERT
    createCompAndSetInRootOfArticle = createCompAndSetInRootOfArticle
    createCompAndSetInElem = createCompAndSetInElem
    createCompAndSetItNearComp = createCompAndSetItNearComp

    // HOOKS
    // Object with hooks
    hooks = hooks

    // MISC
    // The method saves article misc data to localStorage
    // to know what kind of article the editor has to open next time
    supplementArtMarksInLocalStorage = supplementArtMarksInLocalStorage
    saveArticle = saveArticle
    deleteArticle = deleteArticle
}

export default new ArticleManager()