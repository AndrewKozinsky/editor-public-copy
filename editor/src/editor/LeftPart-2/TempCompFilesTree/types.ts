import FilesTreeType from 'types/filesTree'

// Типы компонента TempCompFilesTree
namespace TempCompFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export interface Item extends FilesTreeType.Item {
        // Is Insert inside button allowed
        afterButtonAllowed?: boolean
        insideButtonAllowed?: boolean
    }

    // id папки или файла
    export type UuId = string

    // Массив uuid
    export type UuIdArr = FilesTreeType.UuIdArr

    // Тип элемента: файл или папка
    export type ItemType = FilesTreeType.ItemType


    export type AfterClickBeforeBtn = (ItemUuId: UuId) => void
    export type AfterClickAfterBtn = (ItemUuId: UuId) => void
    export type AfterClickInsideBtn = (ItemUuId: UuId) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    export type AfterCollapseFolder = (items: Items, openUuIdArr: UuIdArr) => void

    export type After = {
        afterCollapseFolder: AfterCollapseFolder
        afterClickBeforeBtn: AfterClickBeforeBtn
        afterClickAfterBtn: AfterClickAfterBtn
        afterClickInsideBtn: AfterClickInsideBtn
    }
}

export default TempCompFilesTreeType
