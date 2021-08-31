import { ReactNode } from 'react'
import Logo from '../icons/logo'
import NoticeError from '../icons/NoticeError'
import NoticeInfo from '../icons/NoticeInfo'
import NoticeSuccess from '../icons/NoticeSuccess'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'
import SelectInputArrows from '../icons/selectInputArrows'
import MainTabMaterials from '../icons/mainTabMaterials'
import MainTabEditor from '../icons/mainTabEditor'
import MainTabSettings from '../icons/mainTabSettings'
import MainTabHelp from '../icons/mainTabHelp'
import MainTabRoundScion from '../icons/mainTabRoundScion'
import BtnSignSave from '../icons/btnSignSave'
import BtnSignFolder from '../icons/btnSignFolder'
import BtnSignTrash from '../icons/btnSignTrash'
import BtnSignAdd from '../icons/btnSignAdd'
import BtnSignCode from '../icons/btnSignCode'
import BtnSignJson from '../icons/btnSignJson'
import BtnSignClose from '../icons/btnSignClose'
import BtnSignExit from '../icons/btnSignExit';
import EditorLightTheme from '../icons/editorLightTheme'
import EditorDarkTheme from '../icons/editorDarkTheme'
import SiteTabSite from '../icons/siteTabSite'
import SiteTabPlugins from '../icons/siteTabPlugins'
import SiteTabArticle from '../icons/siteTabArticle'
import SiteTabComponents from '../icons/siteTabComponents'
import FilesTreeFolderPlus from '../icons/filesTreeFolderPlus'
import FilesTreeTriangle from '../icons/filesTreeTriangle'
import FilesTreePlus from '../icons/filesTreePlus'
import FilesTreeFolder from '../icons/filesTreeFolder'
import FilesTreePlaceMark from '../icons/filesTreePlaceMark'
import FilesTreeTrash from '../icons/filesTreeTrash'
import BtnSignEdit from '../icons/btnSignEdit'
import FilesTreeTorus from '../icons/filesTreeTorus'
import FilesTreeUp from '../icons/filesTreeUp'
import FilesTreeDown from '../icons/filesTreeDown'
import ArticleMenu from '../icons/articleMenu'
import BtnSignUndo from '../icons/btnSignUndo'
import BtnSignRedo from '../icons/btnSignRedo'
import BtnSignCancel from '../icons/btnSignCancel'

/**
 * Функция возвращает внутренную часть значка SVG в зависимости от типа
 * @param {String} type — тип значка.
 */
export function getIcon(type: string): ReactNode {

    type componentsType = {
        [key: string]: ReactNode
    }

    const components: componentsType = {
        // Логотип редактора
        logo: Logo,

        // Значёк ошибки
        errorTriangle: ErrorTriangle,

        // Значёк успеха
        successCircle: SuccessCircle,

        // Галочка выбранного флага
        selectInputArrows: SelectInputArrows,

        // Значки главных вкладок
        mainTabMaterials: MainTabMaterials,
        mainTabEditor: MainTabEditor,
        mainTabSettings: MainTabSettings,
        mainTabHelp: MainTabHelp,

        // Значки на вкладках сайта
        siteTabSite: SiteTabSite,
        siteTabPlugins: SiteTabPlugins,
        siteTabComponents: SiteTabComponents,
        siteTabArticle: SiteTabArticle,

        // Закругляемая часть в кнопки вкладки
        mainTabRoundScion: MainTabRoundScion,

        // Значки на кнопках
        btnSignSave: BtnSignSave,
        btnSignFolder: BtnSignFolder,
        btnSignTrash: BtnSignTrash,
        btnSignCode: BtnSignCode,
        btnSignAdd: BtnSignAdd,
        btnSignJson: BtnSignJson,
        btnSignClose: BtnSignClose,
        btnSignExit: BtnSignExit,
        btnSignEdit: BtnSignEdit,
        btnSignUndo: BtnSignUndo,
        btnSignRedo: BtnSignRedo,
        btnSignCancel: BtnSignCancel,

        // Тема интерфейса
        editorLightTheme: EditorLightTheme,
        editorDarkTheme: EditorDarkTheme,

        // Значки на FilesTree
        filesTreeTriangle: FilesTreeTriangle,
        filesTreeFolder: FilesTreeFolder,
        filesTreeFolderPlus: FilesTreeFolderPlus,
        filesTreePlus: FilesTreePlus,
        filesTreeTorus: FilesTreeTorus,
        filesTreeUp: FilesTreeUp,
        filesTreeDown: FilesTreeDown,

        // Значёк указателя помещения перетаскиваемого элемента
        filesTreePlaceMark: FilesTreePlaceMark,

        // Значёк указателя помещения перетаскиваемого элемента
        filesTreeTrash: FilesTreeTrash,
        articleMenu: ArticleMenu,

        // Значки в Notice
        noticeInfo: NoticeInfo,
        noticeError: NoticeError,
        noticeSuccess: NoticeSuccess,
    }

    return components[type]
}
