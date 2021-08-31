import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import {AppStateType} from 'store/rootReducer'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import TempCompFilesTreeType from '../TempCompFilesTree/types'
import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import {getFromLocalStorage} from 'utils/MiscUtils'
import FilesTreeType from 'types/filesTree'
import { CreateCompFnReturnType } from 'editor/RightPart-2/articleManager/insert'


/** The hooks gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders
    const { tempCompsFolders } = useSelector((store: AppStateType) => store.article)

    // Component templates array
    const tempCompsArr = useSelector((store: AppStateType) => store.article.tempComps)

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Returned folders and component templates structure
    const [folders, setFolders] = useState<TempCompFilesTreeType.Items>([])

    useEffect(function () {
        if (!flashedElemCoords) return

        // Return function if data is not ready yet.
        if (!tempCompsFolders) {
            setFolders([])
            return
        }

        // Get opened component template folders uuid array to open these folders
        const openUuIdArr: null | FilesTreeType.UuIdArr = getFromLocalStorage('article')?.openCompFoldersUuIds

        // Update component template array items
        const updatedFolders = prepareFoldersAndItemsStructure(
            tempCompsFolders, openUuIdArr, flashedElemCoords.selectedElem, tempCompsArr, article
        )

        // Save updated folders and component templates structure
        setFolders(updatedFolders)
    }, [tempCompsFolders, tempCompsArr, flashedElemCoords, article])

    return folders
}

/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openUuIdArr — uuis of the opened folders in
 * @param {Object} selectedElem — object with coordinates of the selected component/element
 * @param {Array} tempCompsArr — component templates array
 * @param {Object} article — article object
 */
function prepareFoldersAndItemsStructure(
    tempCompsFolders: FilesTreeType.Items,
    openUuIdArr: null | FilesTreeType.UuIdArr,
    selectedElem: StoreArticleTypes.HoveredElem,
    tempCompsArr: TempCompTypes.TempComps,
    article: ArticleTypes.Article
): TempCompFilesTreeType.Items {
    return tempCompsFolders.map((item: TempCompFilesTreeType.Item) => {
        // It it is folder and it must be open, then add open property
        if (item.type === 'folder') {
            if (openUuIdArr.find(uuid => uuid === item.uuid)) {
                item.open = true
            }

            if (item.content?.length) {
                item.content = prepareFoldersAndItemsStructure(item.content, openUuIdArr, selectedElem, tempCompsArr, article)
            }

            return item
        }
        // If it is a component template calculate can I insert it in selected element...
        else {
            let afterButtonAllowed = false
            let insideButtonAllowed = false

            // It a no component selected I can insert a new component in the root of an article
            if (!selectedElem.dataCompId && !selectedElem.dataElemId) {
                afterButtonAllowed = true
            }
            // If a component is selected...
            else if (selectedElem.dataCompId && !selectedElem.dataElemId) {
                // If selected component is not a text component, that I can insert component before or after it
                if (selectedElem.type !== 'textComponent') {
                    afterButtonAllowed = true
                }
            }
            // If an element is selected
            else {
                // Get to know can I insert component in this element
                insideButtonAllowed = articleManager.canComponentPutInElement(
                    tempCompsArr, article.components, selectedElem.dataCompId, selectedElem.dataElemId
                )
                afterButtonAllowed = true
            }

            item.afterButtonAllowed = afterButtonAllowed
            item.insideButtonAllowed = insideButtonAllowed

            return  item
        }
    })
}


/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const dispatch = useDispatch()

    return useCallback(function (folders: TempCompFilesTreeType.Items, openUuIdArr: FilesTreeType.UuIdArr) {
        // Set a new folders structure list in the Store
        dispatch(actions.article.setTempCompFolders(folders))

        // Save array of folder's id in the Local storage
        articleManager.supplementArtMarksInLocalStorage({
            openCompFoldersUuIds: openUuIdArr
        })
    }, [])
}


/** The hook returns Next btn click handler  */
export function useGetOnClickBeforeBtn(direction: 'before' | 'after') {
    const dispatch = useDispatch()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component templates array
    const {tempComps} = useSelector((store: AppStateType) => store.article)

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.UuId) {
        const selectedCompId = flashedElemCoords.selectedElem.dataCompId

        let componentsAndMaxCompId: CreateCompFnReturnType
        if (selectedCompId) {
            componentsAndMaxCompId = articleManager.createCompAndSetItNearComp(
                direction, article, tempComps, tempCompId, selectedCompId
            )
        }
        else {
            let place: 'begin' | 'end' = direction === 'before' ? 'begin' : 'end'
            componentsAndMaxCompId = articleManager.createCompAndSetInRootOfArticle(
                place, article, tempComps, tempCompId
            )
        }

        dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))

    }, [dispatch, article, flashedElemCoords, tempComps])
}


/** The hook returns Inside btn click handler  */
export function useGetOnClickInsideBtn() {
    const dispatch = useDispatch()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component template array
    const {tempComps} = useSelector((store: AppStateType) => store.article)

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.UuId) {
        const selectedElemCoords = flashedElemCoords.selectedElem

        const componentsAndMaxCompId = articleManager.createCompAndSetInElem(
            article, tempComps, tempCompId,
            selectedElemCoords.dataCompId,
            selectedElemCoords.dataElemId
        )

        dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))
    }, [dispatch, article, flashedElemCoords, tempComps])

}
