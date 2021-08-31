import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import FilesTreeType from '../../types/filesTree'
import StoreArticleTypes from './articleTypes'
import ArticleTypes from './codeType/articleCodeType'
import TempCompTypes from './codeType/tempCompCodeType'

export type ArticleReducerType = {
    articleUuId: null | string
    articleSiteId: null | string
    // Components template folders
    tempCompsFolders: null | FilesTreeType.Items
    // Components templates array
    tempComps: null | StoreArticleTypes.TempComps
    // Code with
    incFiles: {
        inHead: null | string
        beforeEndBody: null | string
    }
    $links: StoreArticleTypes.LinksObj
    // History steps array
    history: StoreArticleTypes.HistoryItems,
    // Current history point
    historyCurrentIdx: number
    // A history step when the article was saved
    historyStepWhenWasSave: number
}

// Article reducer state example
const stateExample: ArticleReducerType = {
    tempComps: [{
        uuid: '3522-6322-7532-6290',
        name: 'Banner',
        code: <TempCompTypes.TempComp>{}
    }],
    incFiles: {
        inHead: '<link href="http://s.ru/reset.css">',
        beforeEndBody: null
    },
    $links: {
        $window:   window,
        $document: window.document,
        $head:     window.document.head,
        $body:     <HTMLBodyElement>window.document.body
    },
    history: [
        {
            article: <ArticleTypes.Article>{},
            lastId: 32,
            hoveredElem: {
                type: 'element',
                dataCompId: 5,
                dataElemId: 2
            },
            // Selected component/element coordinates
            selectedElem: {
                type: null
                dataCompId: null,
                dataElemId: null
            }
        },
        {...}
    ],
    historyCurrentIdx: 0
    historyStepWhenWasSave: 0
}

// Initial values
const initialState: ArticleReducerType = {
    articleUuId: null,
    articleSiteId: null,
    tempCompsFolders: null,
    tempComps: null,
    incFiles: {
        inHead: null,
        beforeEndBody: null
    },
    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
    },
    history: [],
    historyCurrentIdx: 0,
    historyStepWhenWasSave: 0
}

function clearArticle(
    state: ArticleReducerType, action: StoreArticleTypes.ClearArticleAction
): ArticleReducerType {
    // Do not touch the document's links
    const newState = Object.assign(initialState, {$links: state.$links})

    return newState
}

// Sets article uuId and article site id
function setArticleMarks(
    state: ArticleReducerType, action: StoreArticleTypes.SetArticleMarksAction
): ArticleReducerType {
    return {
        ...state,
        articleUuId: action.payload.articleUuId,
        articleSiteId: action.payload.siteId,
    }
}

// Installing of components array
function setTempComps(
    state: ArticleReducerType, action: StoreArticleTypes.SetTempCompAction
): ArticleReducerType {
    return {
        ...state,
        tempComps: action.payload
    }
}

// Installing an included files string with code
function setIncFilesTemplate(
    state: ArticleReducerType, action: StoreArticleTypes.SetIncFilesTemplateAction
): ArticleReducerType {
    return {
        ...state,
        incFiles: action.payload
    }
}

// Installing an article code
function setArticle(state: ArticleReducerType, action: StoreArticleTypes.SetArticleAction): ArticleReducerType {
    return {
        ...state,
        history: action.payload,
        historyCurrentIdx: 0
    }
}

// Installing an article code
function setLinks(state: ArticleReducerType, action: StoreArticleTypes.SetLinksAction): ArticleReducerType {
    return {
        ...state,
        $links: action.payload
    }
}

// Set ids for hovered or selected component/element
function setHoveredElement(state: ArticleReducerType, action: StoreArticleTypes.SetHoveredElementAction): ArticleReducerType {
    // Get history array and current article idx
    const {history, historyCurrentIdx} = state
    // Current article
    let article = history[historyCurrentIdx]

    // Hovered/selected element coordinates
    const hoveredElem = {
        type: action.payload.type,
        dataCompId: action.payload.dataCompId,
        dataElemId: action.payload.dataElemId
    }

    // Update hovered/selected element coordinates in article
    if (action.payload.actionType === 'hover') {
        article = {
            ...article,
            hoveredElem: hoveredElem
        }
    }
    else if (action.payload.actionType === 'select') {
        article = {
            ...article,
            selectedElem: hoveredElem
        }
    }

    // Set the new article to history array
    const updatedHistoryArr = [...history]
    updatedHistoryArr[historyCurrentIdx] = article

    return {
        ...state,
        history: updatedHistoryArr
    }
}

// Installing an article code
function setTempCompFolders(state: ArticleReducerType, action: StoreArticleTypes.SetTempCompFoldersAction): ArticleReducerType {
    return {
        ...state,
        tempCompsFolders: action.payload,
    }
}

//
function createAndSetHistoryItem(state: ArticleReducerType, action: StoreArticleTypes.CreateAndSetHistoryItemAction): ArticleReducerType {

    const historyArr = createHistoryArr()

    return {
        ...state,
        history: historyArr,
        historyStepWhenWasSave: getSaveStep(),
        historyCurrentIdx: historyArr.length - 1
    }


    function createHistoryArr() {
        const historyArrCopy =  [...state.history]
        historyArrCopy.length = state.historyCurrentIdx + 1
        historyArrCopy.push(
            createHistoryItem()
        )

        return historyArrCopy
    }

    function createHistoryItem() {
        const currentHistoryItem = state.history[state.historyCurrentIdx]

        const historyItem: StoreArticleTypes.HistoryItem = {
            article: createArticle(),
            hoveredElem: currentHistoryItem.hoveredElem,
            selectedElem: currentHistoryItem.selectedElem
        }

        return historyItem
    }

    function createArticle() {
        const newArticle = articleManager.createArticle()
        newArticle.meta.maxComponentId = action.payload.maxCompId
        newArticle.components = action.payload.components

        return newArticle
    }

    function getSaveStep() {
        let newHistoryStepWhenWasSave = state.historyStepWhenWasSave
        if (newHistoryStepWhenWasSave > state.history.length) {
            newHistoryStepWhenWasSave = -1
        }

        return newHistoryStepWhenWasSave
    }
}

// The function changes a current history step
function makeHistoryStep(state: ArticleReducerType, action: StoreArticleTypes.MakeHistoryStepAction): ArticleReducerType {
    let newStep = state.historyCurrentIdx

    if (action.payload === 'undo' && state.historyCurrentIdx - 1 !== -1) {
        newStep--
    }
    else if (action.payload === 'redo' && state.historyCurrentIdx + 1 < state.history.length) {
        newStep++
    }

    return {
        ...state,
        historyCurrentIdx: newStep
    }
}

// The function set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved
function setHistoryStepWhenArticleWasSaved(state: ArticleReducerType, action: StoreArticleTypes.SetHistoryStepWhenArticleWasSavedAction): ArticleReducerType {
    return {
        ...state,
        historyStepWhenWasSave: state.historyCurrentIdx
    }
}


// Редьюсер Store.article
export default function articleReducer(
    state = initialState, action: StoreArticleTypes.ArticleAction
): ArticleReducerType {

    switch (action.type) {
        case StoreArticleTypes.CLEAR_ARTICLE:
            return clearArticle(state, action)
        case StoreArticleTypes.SET_ARTICLE_MARKS:
            return setArticleMarks(state, action)
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action)
        case StoreArticleTypes.SET_INC_FILES_TEMPLATE:
            return setIncFilesTemplate(state, action)
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action)
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action)
        case StoreArticleTypes.SET_HOVERED_ELEMENT:
            return setHoveredElement(state, action)
        case StoreArticleTypes.SET_TEMP_COMP_FOLDERS:
            return setTempCompFolders(state, action)
        case StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM:
            return createAndSetHistoryItem(state, action)
        case StoreArticleTypes.MAKE_HISTORY_STEP:
            return makeHistoryStep(state, action)
        case StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED:
            return setHistoryStepWhenArticleWasSaved(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
