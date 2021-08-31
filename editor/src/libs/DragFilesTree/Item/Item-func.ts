import {SyntheticEvent, useCallback} from 'react'
import DragFilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import {
    addNewItem,
    getOpenedFoldersUuid,
    toggleFolder,
    deleteItem,
    selectItem
} from '../StoreManage/manageState'

/*
    Хук возвращает обработчик наведения и увода мыши на главную обёртку папки.
    В обёртке есть интерактивные кнопки.
    Нужно сделать чтобы всегда подсвечивался только один элемент: или обёртка или кнопки.
    Так как кнопки находятся в обёртке, то такое поведение нельзя реализовать через CSS.
    Поэтому при наведении на обёртку задаётся атрибут data-ft-hover.
    А если навели на кнопки, то у обёртки удаляется атрибут data-ft-hover.
    Для элементов с data-ft-hover в CSS прописан подсвечивающий стиль.
*/
export function useMarkItemElemWhenItHovered() {

    return useCallback(function (event: SyntheticEvent): void {
        const $target = <HTMLElement>event.target
        const $folder = $target.closest('[data-ft-item]').querySelector('[data-ft-inner]')

        if (!$target || !$folder) return

        // Если на элемент навели и это не кнопка...
        if(event.type === 'mouseover' && !$target.closest('[data-ft-item-btn]')) {
            // То поставить обёртке data-ft-hover
            //@ts-ignore
            $folder.dataset.ftHover = 'true'
        }
        // В остальных случаях убрать data-ft-hover
        else {
            //@ts-ignore
            delete $folder.dataset.ftHover
        }
    }, [])
}

/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * Если передан файл, то возвращает классы для невидимого элемента.
 * @param {String} CN — класс компонента
 * @param {Object} itemData — данные папки или файла
 */
export function getTriangleBtnClasses(CN: string, itemData: DragFilesTreeType.Item) {

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
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * @param {String} CN — класс компонента
 * @param {Object} itemData — данные папки
 */
export function getInnerWrapperClasses(
    CN: string, itemData: DragFilesTreeType.Item
) {
    const classes  = [`${CN}__inner`]

    // Добавить обводку если нужно показать метку inside
    if (itemData.placeMark === 'inside') {
        classes.push(`${CN}__inner-round-flash`)
    }

    // Добавить дополнительный класс если это выделенная папка
    if (itemData.active) {
        classes.push(`${CN}__inner-active`)
    }

    return makeCN(classes)
}


/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    folderId: DragFilesTreeType.UuId,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After
) {
    return useCallback(function (e) {
        e.stopPropagation()

        // Свернуть/развернуть папку и возвратить новый массив папок и файлов
        const newItems = toggleFolder(items, folderId)

        // Запустить функцию, переданную в аргументах FilesTree,
        // которая должна запускаться при разворачивании/сворачивании папки
        // и передать массив открытых папок
        if (after.collapseFolder) {
            // Получить uuid раскрытых папок
            const openedFoldersUuid = getOpenedFoldersUuid(newItems)
            after.collapseFolder(openedFoldersUuid)
        }

        if (newItems) setItems(newItems)
    }, [items, folderId])
}

/**
 * Обработчик щелчка по кнопке добавления нового элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {String} newItemType — тип нового элемента
 * @param {Object} folderData — данные папки в которой нужно добавить новую папку или файл
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function createNewItem(
    e: SyntheticEvent,
    newItemType: DragFilesTreeType.ItemType,
    folderData: null | DragFilesTreeType.Item,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After,
) {
    e.stopPropagation()

    // Добавить новую папку или файл и возвратить новый элемент и новое Состояние
    const result = addNewItem(newItemType, folderData, items, after)

    // Если добавили файл...
    if(newItemType === 'file') {
        // Запустить функцию, которая должна быть запущена после добавления файла
        if (after.addingNewItem) {
            after.addingNewItem(result.newState, result.newItem)
        }

        // Если при добавлении файла папка была свёрнута,
        // то после добавления она автоматически раскрывается, поэтому запущу функцию,
        // которая должна быть запущена после раскрытия/скрытия папок
        if (after.collapseFolder) {
            const openedFoldersUuid = getOpenedFoldersUuid(result.newState)
            after.collapseFolder(openedFoldersUuid)
        }
    }

    // Запустить функцию, которая должна быть запущена после изменения структуры папок
    if (after.changingTree) {
        after.changingTree(result.newState)
    }

    // Сделаю новый элемент текущим
    const {newItem, newItems} = selectItem(result.newState, result.newItem.uuid)

    // Запустить функцию, которая должна быть запущена после выделения элемента
    if (after.selectItem) {
        after.selectItem(newItem)
    }

    // Обновить Состояние списка папок
    setItems(newItems)
}

/**
 * Обработчик щелчка по кнопке удаления элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {String} itemId — id папки или файла, которую нужно удалить
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function removeItem(
    e: null | SyntheticEvent,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    itemId: DragFilesTreeType.UuId,
    after?: DragFilesTreeType.After,
) {
    if (e) e.stopPropagation()

    // Удалить переданный элемент и возвратить новый список папок и файлов
    const newItems = deleteItem(items, itemId)

    // Запустить функцию, которая должна быть запущена после удаления папки или файла
    if (after && after.deleteItem) {
        after.deleteItem(newItems, itemId)
    }

    // Обновить Состояние списка папок
    setItems(newItems)
}


/**
 * Хук возвращает обработчик щелчка по папке или файлу.
 * В местное состояние ставит uuid этой папки или файла.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} itemData — данные папки или файла.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetOnClickHandler(
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    itemData: DragFilesTreeType.Item,
    after: DragFilesTreeType.After
) {
    return useCallback(function (e) {
        // Поставить текущий uuid в качестве активного
        const {newItem, newItems} = selectItem(items, itemData.uuid)

        // Запустить функцию, которая должна быть запущена после выделения элемента
        if (after.selectItem) {
            after.selectItem(newItem)
        }

        // Обновить Состояние списка папок
        setItems(newItems)
    }, [itemData, after])
}
