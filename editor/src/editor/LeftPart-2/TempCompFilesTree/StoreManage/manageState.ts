//@ts-ignore
import { v4 as uuid } from 'uuid'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import TempCompFilesTreeType from '../types'
import FilesTreeType from "types/filesTree"


/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно расвернуть/свернуть
 */
export function toggleFolder(items: TempCompFilesTreeType.Items, folderId: TempCompFilesTreeType.UuId) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId)
    if(!folder) return

    // Перевернуть значение открыта ли папка
    const folderCopy = {...folder, open: !(folder.open)}

    // Создание нового массива папок и файлов
    return makeImmutableCopy(items, folder, folderCopy)
}


/**
 * Функция находит в массиве объект данных с переданным id.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно найти
 */
export function getItemDataById(items: TempCompFilesTreeType.Items, itemId: TempCompFilesTreeType.UuId): null | TempCompFilesTreeType.Item {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.uuid === itemId) {
            return item
        }
        else if (item.content) {
            const foundedItem = getItemDataById(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция возвращает uuid раскрытых папок
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} arr — массив с uuid открытых папок (требуется внутри работы функции, в саму функцию передавать не нужно)
 */
export function getOpenedFoldersUuid(items: TempCompFilesTreeType.Items, arr: TempCompFilesTreeType.UuIdArr = []) {
    items.forEach((item: TempCompFilesTreeType.Item) => {
        if (item.open) {
            arr.push(item.uuid)

            if (item.content) {
                getOpenedFoldersUuid(item.content, arr)
            }
        }
    })

    return arr
}


/**
 * Функция возвращает максимальную глубину вложенности файлов
 * @param {Array} items — массив с данными по папкам и файлам
 */
export function getMaxDeep(items: FilesTreeType.Items) {
    let maxDeep = 0

    function crawler(items: FilesTreeType.Items, prevDeep = -1) {
        items.forEach((item: FilesTreeType.Item) => {
            const currentDeep = prevDeep + 1
            if (maxDeep < currentDeep) maxDeep = currentDeep

            if (item.content) {
                crawler(item.content, currentDeep)
            }
        })
    }

    if (items) {
        crawler(items)
    }

    return maxDeep
}
