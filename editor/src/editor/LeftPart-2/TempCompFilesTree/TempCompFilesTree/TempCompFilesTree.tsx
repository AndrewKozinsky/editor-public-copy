import React, {Fragment, ReactNode} from 'react'
import Item from '../Item/Item'
import { useGetFilesTreeMinWidth } from './TempCompFilesTree-func'
import TempCompFilesTreeType from '../types'


type TempCompFilesTreePropType = {
    // Массив данных списка папок и файлов
    items: null | TempCompFilesTreeType.Items
    // Функция запускаемая после разворачивания/сворачивания папки
    afterCollapseFolder: TempCompFilesTreeType.AfterCollapseFolder
    afterClickBeforeBtn: TempCompFilesTreeType.AfterClickBeforeBtn
    afterClickAfterBtn: TempCompFilesTreeType.AfterClickAfterBtn
    afterClickInsideBtn: TempCompFilesTreeType.AfterClickInsideBtn
}

/** Список папок и файлов */
export default function TempCompFilesTree(props: TempCompFilesTreePropType) {

    const after: TempCompFilesTreeType.After = {
        afterCollapseFolder: props.afterCollapseFolder,
        afterClickBeforeBtn: props.afterClickBeforeBtn,
        afterClickAfterBtn: props.afterClickAfterBtn,
        afterClickInsideBtn: props.afterClickInsideBtn
    }

    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(props.items)

    return (
        <div data-file-tree='true' style={{minWidth: minWidth}}>
            {generateItems(props.items, props.items, 0, after)}
        </div>
    )
}

/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
function generateItems(
    allItems: TempCompFilesTreeType.Items,
    innerItems: TempCompFilesTreeType.Items,
    offset: number,
    after: TempCompFilesTreeType.After
): ReactNode {
    if (!allItems) return null

    return innerItems.map(itemData => {

        // Массив файлов и папок вложенный в эту папку
        let innerItems: null | ReactNode = null
        if (itemData.open && itemData.content) {
            innerItems = generateItems(
                allItems,
                itemData.content,
                offset + 1,
                after
            )
        }

        return (
            <Fragment key={itemData.uuid}>
                <Item
                    items={allItems}
                    itemData={itemData}
                    offset={offset}
                    after={after}
                />
                {innerItems}
            </Fragment>
        )
    })
}
