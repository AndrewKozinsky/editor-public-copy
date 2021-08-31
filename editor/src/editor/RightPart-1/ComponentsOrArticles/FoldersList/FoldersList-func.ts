import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { store } from 'store/rootReducer'
import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import createArticleRequest from 'requests/editor/article/createArticleRequest'
import createComponentRequest from 'requests/editor/components/createComponentRequest'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import {addOpenPropToFolders, selectItem} from 'libs/DragFilesTree/StoreManage/manageState'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import {setCompItems, setArtItems} from '../stores'
import { FolderType } from '../types'
import putComponentsFoldersRequest from 'requests/editor/components/putComponentsFoldersRequest'
import putArticlesFoldersRequest from 'requests/editor/article/putArticlesFoldersRequest'
import {GetComponentsFoldersServerResponse, useGetComponentsFoldersRequest } from 'src/requests/editor/components/getComponentsFoldersRequest'
import { useGetArticlesFoldersRequest } from 'requests/editor/article/getArticlesFoldersRequest'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'


/**
 * Хук скачивает с сервера папки и ставит в Хранилище
 * @param {String} type — тип папок: с компонентами или со статьями
 */
// SET ALL DATA TO REDUX!!!
export function useGetFoldersFromServerAndPutInEffector(type: FolderType) {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppStateType) => store.sites.componentsSection)
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {componentsResponse, doComponentsFetch} = useGetComponentsFoldersRequest()

    // Хук делающий запрос данных с сервера на получение папок со статьями
    const {articlesResponse, doArticlesFetch} = useGetArticlesFoldersRequest()


    // При изменении выбранного сайта...
    useEffect(function () {
        // Если не передан id сайта, то обнулить папки в Хранилище
        if (!currentSiteId) {
            // Поставить в Эффектор пустые значения по папкам компонентов и статей
            setCompItems(null)
            setArtItems(null)
            return
        }

        // Скачать новый массив папок компонентов и статей
        if (type === 'components') doComponentsFetch()
        if (type === 'articles') doArticlesFetch()
    }, [currentSiteId])

    useEffect(function () {
        if (!componentsResponse) return

        // При получении данных по папкам поставить их в Эффектор
        setItemsToEffector(componentsResponse, type, currentCompItemId, setCompItems)
    }, [componentsResponse])

    useEffect(function () {
        if (!articlesResponse) return

        // При получении данных по папкам поставить их в Эффектор
        setItemsToEffector(articlesResponse, type, currentArtItemId, setArtItems)
    }, [articlesResponse])
}

/**
 *
 * @param {Object} response — объект ответа от сервера
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {String} currentItemId — uuid элемента, который должен быть выделен
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 */
function setItemsToEffector(
    response: GetComponentsFoldersServerResponse,
    type: FolderType,
    currentItemId: DragFilesTreeType.UuId,
    setItems: (items: DragFilesTreeType.Items) => void
) {
    if (response.status === 'fail') return

    if (response.data.folders.content) {
        // Превратить присланный JSON в массив
        let content = JSON.parse(response.data.folders.content)

        // Открыть папки, которые должны быть открытыми
        const openedFoldersUuIds = getOpenedFoldersUuId(type)
        if (openedFoldersUuIds) {
            content = addOpenPropToFolders(content, openedFoldersUuIds)
        }

        // Выделить элемент, который должен быть выделен
        content = selectItem(content, currentItemId).newItems

        // Поставить в Эффектор присланный порядок
        setItems(content)
    }
    else {
        setItems([])
    }
}


/**
 * Функция сохраняет массив папок или шаблонов компонентов на сервере
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function saveItemsOnServer(type: FolderType, items: DragFilesTreeType.Items) {
    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    // Сохранить данные на сервере
    if (type === 'components') {
        await putComponentsFoldersRequest(preparedItems)
    }
    else if (type === 'articles') {
        await putArticlesFoldersRequest(preparedItems)
    }
}

/**
 * Функция запускаемая после удаления папки с компонентами или статьями
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} deletedItemUuid — uuid удалённого элемента
 */
export function afterDeleteItem(type: FolderType, items: DragFilesTreeType.Items, deletedItemUuid: DragFilesTreeType.UuId) {
    // Обнулить данные выделенного элемента в Хранилище
    if (type === 'components') {
        store.dispatch( actions.sites.setCurrentComp(null, null) )
    }
    else if (type === 'articles') {
        store.dispatch( actions.sites.setCurrentArt(null, null) )

        // If the opened article is not in new items array then it is in the deleted folder,
        // then clear article editor because the article will be deleted.
        if ( filesTreePublicMethods.getItemById(items, store.getState().article.articleUuId) ) {
            store.dispatch( actions.article.clearArticle() )
        }
    }

    // Обновить uuid открытых папок в LocalStorage
    const openedFoldersUuid = filesTreePublicMethods.getOpenedFoldersUuid(items)
    if (type === 'components') {
        setInLocalStorage('editorComponentsOpenedFolders', openedFoldersUuid)
    }
    else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', openedFoldersUuid)
    }

    // Сохранить данные на сервере
    saveItemsOnServer(type, items)

    // Удалить компонент или статью на сервере
    if (type === 'components') {
        deleteComponentRequest(deletedItemUuid)
    }
    else if (type === 'articles') {
        deleteArticleRequest(deletedItemUuid)
    }
}


/**
 * Функция запускаемая после добавления новой папки или файла (компонента или статьи)
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Object} item — данные нового файла.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function afterAddingNewItem(type: FolderType, items: DragFilesTreeType.Items, item: DragFilesTreeType.Item) {
    // Параметры функции создания шаблона компонента или статьи
    const uuid = item.uuid
    const name = item.name

    // Сохранить данные на сервере
    if (type === 'components') {
        await createComponentRequest(uuid, name, 'null')
    }
    else if (type === 'articles') {
        // Create code of a new article
        let code = JSON.stringify( articleManager.createArticle() )

        await createArticleRequest(uuid, name, code)
    }
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив uuid открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} arrUuId — массив uuid раскрытых папок
 */
export function afterCollapseFolder(type: FolderType, arrUuId: DragFilesTreeType.UuIdArr) {
    // Массив uuid открытых папок
    const uuids = JSON.stringify(arrUuId)

    if (type === 'components') {
        setInLocalStorage('editorComponentsOpenedFolders', uuids)
    }
    else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', uuids)
    }
}

/** Функция получает из localStorage uuid открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersUuId(type: FolderType) {
    if (type === 'components') {
        return getFromLocalStorage('editorComponentsOpenedFolders')
    }
    else if (type === 'articles') {
        return getFromLocalStorage('editorArticlesOpenedFolders')
    }
}

/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick(type: FolderType) {
    const dispatch = useDispatch()

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (item: DragFilesTreeType.Item) {
        if (type === 'components') {
            dispatch(actions.sites.setCurrentComp(item.uuid, item.type))
        }
        else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.uuid, item.type))
        }
    }, [dispatch])
}
