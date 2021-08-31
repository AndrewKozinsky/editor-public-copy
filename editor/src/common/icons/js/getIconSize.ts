
/**
 * Функция возращает атрибуты с размерами значка в SVG.
 * В зависимости от типа значка будут возвращены разные названия размеры
 * @param {String} type — тип значка.
 */
export function getIconSize(type: string) {

    switch (type) {
        // Логотип редактора
        case 'logo':
            return {
                width: "84px",
                height: "18px",
                viewBox: "0 0 84 18"
            }
        // Значёк успеха
        case 'successCircle':
        // Значёк ошибки
        case 'errorTriangle':
            return {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            }
        // Галочка выбранного флага
        case 'selectInputArrows':
            return {
                width: "8px",
                height: "14px",
                viewBox: "0 0 8 14"
            }
        // Значки главных вкладок
        case 'mainTabMaterials':
        case 'mainTabEditor':
        case 'mainTabSettings':
        // Значки на вкладках сайта
        case 'siteTabSite':
        case 'siteTabPlugins':
        case 'siteTabComponents':
        case 'siteTabArticle':
            return {
                width: "31px",
                height: "26px",
                viewBox: "0 0 31 26"
            }
        case 'mainTabHelp':
            return {
                width: "31px",
                height: "25px",
                viewBox: "0 0 31 25"
            }
        // Закругляемая часть в кнопки вкладки
        case 'mainTabRoundScion':
            return {
                width: "3px",
                height: "3px",
                viewBox: "0 0 3 3"
            }
        // Значки на кнопках
        case 'btnSignSave':
            return {
                width: "12px",
                height: "15px",
                viewBox: "0 0 12 15"
            }
        case 'btnSignFolder':
        case 'btnSignAdd':
        case 'btnSignJson':
        case 'btnSignEdit':
        case 'btnSignCancel':
            return {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            }
        case 'btnSignTrash':
        case 'btnSignUndo':
        case 'btnSignRedo':
            return {
                width: "14px",
                height: "15px",
                viewBox: "0 0 14 15"
            }
        case 'btnSignCode':
            return {
                width: "16px",
                height: "15px",
                viewBox: "0 0 16 15"
            }

        case 'btnSignClose':
            return {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            }
        case 'btnSignExit':
            return {
                width: "13px",
                height: "15px",
                viewBox: "0 0 13 15"
            }
        // Тема интерфейса
        case 'editorLightTheme':
        case 'editorDarkTheme':
            return {
                width: "76px",
                height: "76px",
                viewBox: "0 0 76 76"
            }
        // Значки на FilesTree
        case 'filesTreeTriangle':
            return {
                width: "10px",
                height: "10px",
                viewBox: "0 0 10 10"
            }
        case 'filesTreeFolder':
        case 'filesTreeFolderPlus':
        case 'filesTreePlus':
        case 'filesTreeTrash':
        case 'filesTreeTorus':
        case 'filesTreeUp':
        case 'filesTreeDown':
            return {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            }
        case 'filesTreePlaceMark':
            return {
                width: "8px",
                height: "5px",
                viewBox: "0 0 8 5"
            }
        case 'articleMenu':
            return {
                width: "18px",
                height: "14px",
                viewBox: "0 0 18 14"
            }
        case 'noticeInfo':
        case 'noticeError':
        case 'noticeSuccess':
            return {
                width: "18px",
                height: "18px",
                viewBox: "0 0 18 18"
            }
        default: {
            return {}
        }
    }
}
