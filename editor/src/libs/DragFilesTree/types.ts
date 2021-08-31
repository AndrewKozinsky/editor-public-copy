import FilesTreeType from '../../types/filesTree'

// Типы компонента DragFilesTree
namespace DragFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export interface Item extends FilesTreeType.Item {
        // Визуальная отметка куда будет помещён перемещаемый элемент
        placeMark?: PlaceMark
        active?: boolean // Выделен ли элемент
        content?: Items // Содержимое папки (если папка)
    }

    export type SetItems = (items: Items) => void

    // id папки или файла
    export type UuId = string

    // Массив uuid
    export type UuIdArr = FilesTreeType.UuIdArr

    // Тип элемента: файл или папка
    export type ItemType = FilesTreeType.ItemType

    // Визуальная отметка куда будет помещён перемещаемый элемент:
    // null — отметка не ставится
    // before или after — выше или ниже текущего элемента
    // inside — внутрь (только для папки)
    export type PlaceMark = null | 'before' | 'after' | 'inside'

    // Функция запускаемая после создания новой папки или файла
    export type AfterAddingNewItemFn = (items: Items, item: Item) => void

    // Функция запускаемая после щелчка по папке или файлу
    export type AfterSelectItemFn = (item: Item) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    // На вход получает массив идентификаторов раскрытых папок
    export type AfterCollapseFolderFn = (openUuIdArr: UuIdArr) => void

    // Функция запускаемая после изменения дерева папок и файлов
    export type AfterChangingTreeFn = (items: Items) => void

    // Функция запускаемая после удаления папки или файла
    export type AfterDeleteItem = (items: Items, deletedItemUuid: UuId) => void

    export type After = {
        newFolderName?: string
        newFileName?: string
        addingNewItem?: AfterAddingNewItemFn
        selectItem?: AfterSelectItemFn
        collapseFolder?: AfterCollapseFolderFn
        changingTree?: AfterChangingTreeFn
        deleteItem?: AfterDeleteItem
    }
}

export default DragFilesTreeType
