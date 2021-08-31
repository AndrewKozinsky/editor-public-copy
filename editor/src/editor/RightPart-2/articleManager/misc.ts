import FilesTreeType from 'types/filesTree'
import {updateArticleCodeRequest} from 'requests/editor/article/updateArticleRequest'
import StoreArticleTypes from 'store/article/articleTypes'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import articleManager from './articleManager'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import deleteArticleRequest from '../../../requests/editor/article/deleteArticleRequest'


type MarksObj = {
    // Article site id
    siteId?: string // '60ca102ef8cfcc002074b3da'
    // Article uuid
    articleId?: string // '1dc98c6c-c2fd-45bd-ad9d-25129045c818'
    // id of included files template id
    incFilesId?: string // '60cc62ab5405e00071442016'
    // open component template folder uuids
    openCompFoldersUuIds?: FilesTreeType.UuIdArr // ['1', '3']
}

/**
 * Function saves article misc data (article site id, article uuid and other data) to localStorage
 * to know what kind of article the editor has to open next time
 * @param {Object} marksObj — saved data
 */
export function supplementArtMarksInLocalStorage(this: typeof articleManager, marksObj: MarksObj) {
    // Current object with article data
    const currentMarkObj = getFromLocalStorage('article')

    let updatedMarkObj = currentMarkObj
        ? Object.assign(currentMarkObj, marksObj)
        : marksObj

    setInLocalStorage('article', updatedMarkObj)
}

/**
 * The function saves code of an article to a server
 * @param {Array} historyArr — articles history array
 * @param {Number} historyCurrentIdx — current history item index
 * @param {String} articleUuId — article uuid which I have to save in a server
 */
export async function saveArticle(
    this: typeof articleManager,
    historyArr: StoreArticleTypes.HistoryItems,
    historyCurrentIdx: number,
    articleUuId: null | string
) {
    if (!articleUuId) return

    // Set current history step to historyStepWhenWasSave to know what step the article was saved
    store.dispatch( actions.article.setHistoryStepWhenArticleWasSaved() )

    // Get current history item object
    const historyItem = this.getCurrentHistoryItem(historyArr, historyCurrentIdx)

    // Save article code in a server
    await updateArticleCodeRequest(articleUuId, historyItem.article)
}

/**
 * The function saves code of an article to a server
 * @param {String} articleUuId — article uuid which I have to save in a server
 */
export async function deleteArticle( this: typeof articleManager, articleUuId: null | string ) {
    if (!articleUuId) return

    // Delete article in a server
    await deleteArticleRequest(articleUuId)
}
