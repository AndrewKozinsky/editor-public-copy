import {ArticleDataType} from 'src/requests/editor/article/getArticleRequest'
import {ComponentDataType} from 'src/requests/editor/components/getComponentRequest'
import FilesTreeType from '../../types/filesTree'

namespace StoreSitesTypes {

    // Сайт
    export type SiteType = {
        id: string,
        name: string,
        // id шаблона подключаемого файла применяемый по умолчанию при создании статьи для этого сайта
        defaultIncFilesTemplateId: null | string
    }
    // Сайты
    export type SitesType = SiteType[]
    // id выбранного сайта
    export type CurrentSiteId = null | string
    // id открытой вкладки на правой части
    export type RightMainTab = number

    // Шаблон подключаемых файлов
    export type IncFilesTemplateType = {
        id: string,
        name: string,
        head?: string
        body?: string
    }
    // Массив шаблонов подключаемых файлов
    export type IncFilesTemplatesType = IncFilesTemplateType[]
    // id выбранного шаблона подключаемых файлов
    export type CurrentIncFilesTemplateId = null | string

    // uuid выбранного элемента: папки или компонента
    export type CurrentCompItemId = null | FilesTreeType.UuId
    // Тип выбранного шаблона компонента (папка или компонент)
    export type CurrentCompItemType = null | FilesTreeType.ItemType
    // Имя выбранного компонента
    export type ComponentName = null | string
    // Строка с кодом выбранного шаблона компонента
    export type ComponentCode = null | string

    // Объект с данными компонента
    export type ComponentsSection = {
        currentCompItemId: CurrentCompItemId
        currentCompItemType: CurrentCompItemType
        currentCompName: ComponentName
        currentCompCode: ComponentCode
    }

    // uuid выбранного элемента: папки или статьи
    export type CurrentArtItemId = null | FilesTreeType.UuId
    // Тип выбранного элемента (папка или компонент)
    export type CurrentArtItemType = null | FilesTreeType.ItemType
    // Имя выбранной статьи
    export type ArticleName = string
    // Строка с кодом выбранной статьи
    export type ArticleCode = null | string

    // Объект с данными статьи
    export type ArticlesSection = {
        currentArtItemId: CurrentArtItemId
        currentArtItemType: CurrentArtItemType
        currentArtName: ArticleName
        currentArtCode: ArticleCode,
        incFilesTemplateId: CurrentIncFilesTemplateId
    }

    // Типы типа и тип экшена
    // Установка массива сайтов
    export const SET_SITES = 'SET_SITES'
    export type SetSitesAction = {
        type: typeof SET_SITES
        payload: SitesType
    }

    // Установка id выбранного сайта
    export const SET_CURRENT_SITE_ID = 'SET_CURRENT_SITE_ID'
    export type SetCurrentSiteIdAction = {
        type: typeof SET_CURRENT_SITE_ID
        payload: CurrentSiteId
    }

    // Установка id текущей основной вкладки справа
    export const SET_RIGHT_MAIN_TAB = 'SET_RIGHT_MAIN_TAB'
    export type SetRightMainTabAction = {
        type: typeof SET_RIGHT_MAIN_TAB
        payload: RightMainTab
    }


    // Установка массива шаблонов подключаемых файлов
    export const SET_INC_FILES_TEMPLATES = 'SET_INC_FILES_TEMPLATES'
    export type SetIncFilesTemplatesAction = {
        type: typeof SET_INC_FILES_TEMPLATES
        payload: IncFilesTemplatesType
    }

    // Установка id выбранного шаблона подключаемых файлов
    export const SET_CURRENT_INC_FILES_TEMPLATE_ID = 'SET_CURRENT_INC_FILES_TEMPLATE_ID'
    export type SetCurrentIncFilesTemplateIdAction = {
        type: typeof SET_CURRENT_INC_FILES_TEMPLATE_ID
        payload: CurrentIncFilesTemplateId
    }

    // Установка id выбранного шаблона компонента
    export const SET_CURRENT_COMP = 'SET_CURRENT_COMP'
    export type SetCurrentCompAction = {
        type: typeof SET_CURRENT_COMP
        payload: {
            id: null | FilesTreeType.UuId
            type: null | FilesTreeType.ItemType
            compData?: ComponentDataType
        }
    }

    // Component Template item (folder or file) type setting
    export const SET_CURRENT_COMP_ITEM_TYPE = 'SET_CURRENT_COMP_ITEM_TYPE'
    export type SetCurrentCompItemTypeAction = {
        type: typeof SET_CURRENT_COMP_ITEM_TYPE
        payload: StoreSitesTypes.CurrentCompItemType
    }

    // Component Template item id setting
    export const SET_CURRENT_COMP_ITEM_ID = 'SET_CURRENT_COMP_ITEM_ID'
    export type SetCurrentCompItemIdAction = {
        type: typeof SET_CURRENT_COMP_ITEM_ID
        payload: StoreSitesTypes.CurrentCompItemId
    }

    // Установка id выбранной папки или статьи
    export const SET_CURRENT_ART = 'SET_CURRENT_ART'
    export type SetCurrentArtAction = {
        type: typeof SET_CURRENT_ART
        payload: {
            id: null | FilesTreeType.UuId
            type: null | FilesTreeType.ItemType
            article?: ArticleDataType
        }
    }

    // Article item (folder or file) type setting
    export const SET_CURRENT_ART_ITEM_TYPE = 'SET_CURRENT_ART_ITEM_TYPE'
    export type SetCurrentArtItemTypeAction = {
        type: typeof SET_CURRENT_ART_ITEM_TYPE
        payload: StoreSitesTypes.CurrentArtItemType
    }

    // Article item (folder or file) id setting
    export const SET_CURRENT_ART_ITEM_ID = 'SET_CURRENT_ART_ITEM_ID'
    export type SetCurrentArtItemIdAction = {
        type: typeof SET_CURRENT_ART_ITEM_ID
        payload: StoreSitesTypes.CurrentArtItemId
    }


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction
        | SetIncFilesTemplatesAction
        | SetCurrentIncFilesTemplateIdAction
        | SetCurrentCompAction
        | SetCurrentCompItemTypeAction
        | SetCurrentCompItemIdAction
        | SetCurrentArtAction
        | SetCurrentArtItemTypeAction
        | SetCurrentArtItemIdAction
}

export default StoreSitesTypes
