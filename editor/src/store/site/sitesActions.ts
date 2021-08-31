import StoreSitesTypes from './sitesTypes'
import {MiscTypes} from 'types/miscTypes'
import store from '../store'
import sitesRequest from 'src/requests/editor/sites/sitesRequest'
import getIncFilesTemplatesRequest from 'src/requests/editor/incFiles/getIncFilesTemplatesRequest'
import getArticleRequest, {ArticleDataType} from 'src/requests/editor/article/getArticleRequest'
import getComponentRequest, { ComponentDataType } from 'src/requests/editor/components/getComponentRequest'
import FilesTreeType from '../../types/filesTree'


const sitesActions = {
    // Установка id текущей основной вкладки справа
    setRightMainTab(payload: StoreSitesTypes.RightMainTab): StoreSitesTypes.SetRightMainTabAction {
        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload
        }
    },


    // САЙТЫ =====================================================================================

    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Запрос на получение списка сайтов
            const response = await sitesRequest()

            if (!response || response.status !== 'success') return

            // Формированое массива сайтов для установки в Хранилище
            const preparedSites = response.data.sites.map((site: any) => {
                return {
                    id: site._id,
                    name: site.name,
                    defaultIncFilesTemplateId: site.defaultIncFilesTemplateId || null
                }
            })

            // Установка сайтов в Хранилище
            dispatch( sitesActions.setSites(preparedSites) )
        }
    },

    // Установка массива сайтов
    setSites(payload: StoreSitesTypes.SitesType): StoreSitesTypes.SetSitesAction {
        return {
            type: StoreSitesTypes.SET_SITES,
            payload
        }
    },

    // Установка id выбранного сайта
    setCurrentSiteId(payload: StoreSitesTypes.CurrentSiteId): StoreSitesTypes.SetCurrentSiteIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_ID,
            payload
        }
    },


    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ===========================================================================

    // Загрузка с сервера шаблонов подлючаемых файлова и установка в Хранилище
    requestIncFilesTemplates() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // id текущего сайта для которого нужно получить шаблоны подключаемых файлов
            const siteId = store.getState().sites.currentSiteId

            // Если не передан id сайта, то обнулить массив шаблонов подключаемых файлов в Хранилище
            // потому что выбрали новый сайт
            if (!siteId) dispatch( sitesActions.setTemplates([]) )

            // Запрос и ответ от сервера
            const response = await getIncFilesTemplatesRequest(siteId)

            if (response.status !== 'success') return

            // Формированое массива шаблонов для установки в Хранилище
            const preparedTemplates = response.data.templates.map((template: any) => {
                // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                return  {
                    id: template._id,
                    name: template.name,
                    head: template.codeInHead?.code || '',
                    body: template.codeBeforeEndBody?.code || ''
                }
            })

            // Установка шаблонов подключаемых файлов в Хранилище
            dispatch( sitesActions.setTemplates(preparedTemplates) )
        }
    },

    // Установка массива шаблонов подключаемых файлов
    setTemplates(payload: StoreSitesTypes.IncFilesTemplatesType): StoreSitesTypes.SetIncFilesTemplatesAction {
        return {
            type: StoreSitesTypes.SET_INC_FILES_TEMPLATES,
            payload
        }
    },

    // Установка id выбранного шаблона подключаемых шаблонов
    setCurrentIncFilesTemplateId(payload: StoreSitesTypes.CurrentIncFilesTemplateId): StoreSitesTypes.SetCurrentIncFilesTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_INC_FILES_TEMPLATE_ID,
            payload
        }
    },


    // ШАБЛОНЫ КОМПОНЕНТОВ ==================================================================================

    // Загрузка с сервера шаблона компонента и установка в Хранилище
    requestComponentTemplate() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // uuid выбранного шаблона компонента, данные которого нужно скачать
            const {currentCompItemId} = store.getState().sites.componentsSection

            // Если uuid компонента не передан, то обнулить данные компонета в Хранилище
            if (!currentCompItemId) dispatch( sitesActions.setCurrentComp(null, null) )

            // Запрос и ответ от сервера
            const response = await getComponentRequest(currentCompItemId)

            if (response.status !== 'success') return
            const compData = response.data.component

            if (compData) {
                // Установка данных шаблона компонента в Хранилище
                dispatch( sitesActions.setCurrentComp(compData.uuid, 'file', compData) )
            }
        }
    },

    // Установка id и типа выбранного шаблона компонента
    setCurrentComp(
        id: null | FilesTreeType.UuId,
        type: null | FilesTreeType.ItemType,
        compData?: ComponentDataType
    ): StoreSitesTypes.SetCurrentCompAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP,
            payload: {
                id,
                type,
                compData
            }
        }
    },

    // Component Template item (folder or file) type setting
    setCurrentCompItemType(payload: StoreSitesTypes.CurrentCompItemType): StoreSitesTypes.SetCurrentCompItemTypeAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP_ITEM_TYPE,
            payload
        }
    },

    // Component Template item id setting
    setCurrentCompItemId(payload: StoreSitesTypes.CurrentCompItemId): StoreSitesTypes.SetCurrentCompItemIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP_ITEM_ID,
            payload
        }
    },


    // СТАТЬИ ======================================================================================

    // Загрузка с сервера шаблона компонента и установка в Хранилище
    requestArticle() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // uuid выбранной статьи, данные которой нужно скачать
            const {currentArtItemId} = getState().sites.articlesSection

            // Если uuid статьи не передан, то обнулить данные статьи в Хранилище
            if (!currentArtItemId) dispatch( sitesActions.setCurrentArt(null, null) )

            // Запрос и ответ от сервера
            const response = await getArticleRequest(currentArtItemId)

            if (response.status !== 'success') return
            const articleData = response.data.article

            if (articleData) {
                dispatch( sitesActions.setCurrentArt(articleData.uuid, 'file', articleData) )
            }
        }
    },

    // Установка id и типа выбранного шаблона компонента
    setCurrentArt(
        id: null | FilesTreeType.UuId,
        type: null | FilesTreeType.ItemType,
        article?: ArticleDataType
    ): StoreSitesTypes.SetCurrentArtAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART,
            payload: {
                id,
                type,
                article
            }
        }
    },

    // Article item (folder or file) type setting
    setCurrentArtItemType(payload: StoreSitesTypes.CurrentArtItemType): StoreSitesTypes.SetCurrentArtItemTypeAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART_ITEM_TYPE,
            payload
        }
    },

    // Article item (folder or file) type setting
    setCurrentArtItemId(payload: StoreSitesTypes.CurrentArtItemId): StoreSitesTypes.SetCurrentArtItemIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART_ITEM_ID,
            payload
        }
    },
}

export default sitesActions