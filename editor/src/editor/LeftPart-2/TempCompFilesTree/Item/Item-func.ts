import {SyntheticEvent, useCallback} from 'react'
import {makeCN} from 'utils/StringUtils'
import {
    getOpenedFoldersUuid,
    toggleFolder
} from '../StoreManage/manageState'
import TempCompFilesTreeType from '../types'



/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * Если передан файл, то возвращает классы для невидимого элемента.
 * @param {String} CN — класс компонента
 * @param {Object} itemData — данные папки или файла
 */
export function getTriangleBtnClasses(CN: string, itemData: TempCompFilesTreeType.Item) {

    if (itemData.type === 'file') {
        return `${CN}__btn-triangle--for-file`
    }
    else if (itemData.type === 'folder') {
        const classes  = [`${CN}__btn`, `${CN}__btn-triangle`]

        // Если папка открыта
        if (itemData.open) {
            classes.push(`${CN}__btn-triangle--open`)
        }

        // Если в папке нет данных, то сделать кнопку невидимой
        if (!itemData.content || !itemData.content.length) {
            classes.push(`${CN}__btn-triangle--invisible`)
        }

        return makeCN(classes)
    }
}


/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Object} after — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    folderId: TempCompFilesTreeType.UuId,
    items: TempCompFilesTreeType.Items,
    after: TempCompFilesTreeType.After
) {
    return useCallback(function (e) {
        e.stopPropagation()

        // Свернуть/развернуть папку и возвратить новый массив папок и файлов
        const newItems = toggleFolder(items, folderId)

        // Получить uuid раскрытых папок
        const openedFoldersUuid = getOpenedFoldersUuid(newItems)

        after.afterCollapseFolder(newItems, openedFoldersUuid)

    }, [items, folderId])
}

/**
 * Хук возвращает обработчик щелчка по папке или файлу.
 * В местное состояние ставит uuid этой папки или файла.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Object} itemData — данные папки или файла.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetOnClickHandler(
    items: TempCompFilesTreeType.Items,
    itemData: TempCompFilesTreeType.Item,
    after: TempCompFilesTreeType.After
) {
    return useCallback(function (e: SyntheticEvent) {
        // Toggle folder opening
        if (itemData.type === 'folder') {
            const newItems = toggleFolder(items, itemData.uuid)

            // Получить uuid раскрытых папок
            const openedFoldersUuid = getOpenedFoldersUuid(newItems)

            after.afterCollapseFolder(newItems, openedFoldersUuid)
        }
    }, [itemData, after])
}
