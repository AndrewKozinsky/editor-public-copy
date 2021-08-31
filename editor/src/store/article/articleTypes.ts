import TempCompTypes from './codeType/tempCompCodeType'
import ArticleTypes from './codeType/articleCodeType'
import FilesTreeType from 'libs/DragFilesTree/types'
import {CreateCompFnReturnType} from 'editor/RightPart-2/articleManager/insert'

namespace StoreArticleTypes {

    export type HistoryItems = HistoryItem[]

    export type HistoryItem = {
        // Articles
        article: ArticleTypes.Article
        // Hovered component/element coordinates
        hoveredElem: HoveredElem
        // Selected component/element coordinates
        selectedElem: HoveredElem
    }

    export type HoveredElem = {
        type: HoveredElementType
        dataCompId: HoveredElementCompId
        dataElemId: HoveredElementElemId
    }

    export type HoveredElementType = null | 'component' | 'element' | 'textComponent'
    export type HoveredElementCompId = null | ArticleTypes.DataCompId
    export type HoveredElementElemId = null | ArticleTypes.DataElemId

    // Components
    export type TempComps = TempComp[]

    // A component template
    export type TempComp = {
        uuid: string
        name: string
        code: TempCompTypes.TempComp
    }

    export type LinksObj = {
        $window:   StoreArticleTypes.WindowLink
        $document: StoreArticleTypes.DocumentLink
        $head:     StoreArticleTypes.HeadLink
        $body:     StoreArticleTypes.BodyLink
    }

    // IFrame window, document, head and body
    export type WindowLink = null | Window
    export type DocumentLink = null | HTMLDocument
    export type HeadLink = null | HTMLHeadElement
    export type BodyLink = null | HTMLBodyElement


    // =============================================

    // Типы типа и тип экшена
    // Set components templates array
    export const CLEAR_ARTICLE = 'CLEAR_ARTICLE'
    export type ClearArticleAction = {
        type: typeof CLEAR_ARTICLE
    }

    // Set components templates array
    export const SET_ARTICLE_MARKS = 'SET_ARTICLE_MARKS'
    export type SetArticleMarksAction = {
        type: typeof SET_ARTICLE_MARKS
        payload: {
            siteId: string,
            articleUuId: string
        }
    }

    // Типы типа и тип экшена
    // Set components templates array
    export const SET_TEMP_COMPS = 'SET_TEMP_COMPS'
    export type SetTempCompAction = {
        type: typeof SET_TEMP_COMPS
        payload: StoreArticleTypes.TempComps
    }

    // Set article object
    export const SET_ARTICLE = 'SET_ARTICLE'
    export type SetArticleAction = {
        type: typeof SET_ARTICLE
        payload: HistoryItems
    }

    // Set article object
    export const SET_INC_FILES_TEMPLATE = 'SET_INC_FILES_TEMPLATE'
    export type SetIncFilesTemplateAction = {
        type: typeof SET_INC_FILES_TEMPLATE
        payload: {
            inHead: string
            beforeEndBody: string
        }
    }

    // Set links to iFrame elements
    export const SET_LINKS = 'SET_LINKS'
    export type SetLinksAction = {
        type: typeof SET_LINKS
        payload: {
            $window:   WindowLink
            $document: DocumentLink
            $head:     HeadLink
            $body:     BodyLink
        }
    }

    // Set links to iFrame elements
    export const SET_HOVERED_ELEMENT = 'SET_HOVERED_ELEMENT'
    export type SetHoveredElementAction = {
        type: typeof SET_HOVERED_ELEMENT
        payload: {
            actionType: 'hover' | 'select',
            type: StoreArticleTypes.HoveredElementType,
            dataCompId: StoreArticleTypes.HoveredElementCompId,
            dataElemId: StoreArticleTypes.HoveredElementElemId
        }
    }

    // Set links to iFrame elements
    export const SET_TEMP_COMP_FOLDERS = 'SET_TEMP_COMP_FOLDERS'
    export type SetTempCompFoldersAction = {
        type: typeof SET_TEMP_COMP_FOLDERS
        payload: FilesTreeType.Items
    }

    //
    export const CREATE_AND_SET_HISTORY_ITEM = 'CREATE_AND_SET_HISTORY_ITEM'
    export type CreateAndSetHistoryItemAction = {
        type: typeof CREATE_AND_SET_HISTORY_ITEM
        payload: CreateCompFnReturnType
    }

    // Action changes a current history step
    export const MAKE_HISTORY_STEP = 'MAKE_HISTORY_STEP'
    export type MakeHistoryStepAction = {
        type: typeof MAKE_HISTORY_STEP
        payload: 'undo' | 'redo'
    }

    // Action changes a current history step
    export const SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED = 'SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED'
    export type SetHistoryStepWhenArticleWasSavedAction = {
        type: typeof SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED
    }


    export type ArticleAction =
        | ClearArticleAction
        | SetArticleMarksAction
        | SetTempCompAction
        | SetIncFilesTemplateAction
        | SetArticleAction
        | SetLinksAction
        | SetHoveredElementAction
        | SetTempCompFoldersAction
        | CreateAndSetHistoryItemAction
        | MakeHistoryStepAction
        | SetHistoryStepWhenArticleWasSavedAction
}

export default StoreArticleTypes
