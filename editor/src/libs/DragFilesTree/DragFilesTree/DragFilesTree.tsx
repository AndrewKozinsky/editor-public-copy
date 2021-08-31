import React, {Fragment, ReactNode} from 'react'
import DragFilesTreeType from '../types'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import { useGetFilesTreeMinWidth } from './DragFilesTree-func'
import Item from '../Item/Item'
import {createNewItem} from '../Item/Item-func'


type DragFilesTreePropType = {
    // Массив данных списка папок и файлов
    items: null | DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Название новой папки (текст на кнопке и название новой папки)
    newFolderName?: string
    // Название нового файла (текст на кнопке и название нового файла)
    newFileName?: string
    // Функция запускаемая после добавления нового файла
    afterAddingNewItem?: DragFilesTreeType.AfterAddingNewItemFn
    // Функция запускаемая после щелчка по папке или файлу
    afterSelectItem?: DragFilesTreeType.AfterSelectItemFn
    // Функция запускаемая после разворачивания/сворачивания папки
    afterCollapseFolder?: DragFilesTreeType.AfterCollapseFolderFn
    // Функция запускаемая после добавления новой папки
    afterChangingTree?: DragFilesTreeType.AfterChangingTreeFn
    // Функция запускаемая после удаления папки или файла
    afterDeleteItem?: DragFilesTreeType.AfterDeleteItem
}

/** Список папок и файлов */
export default function DragFilesTree(props: DragFilesTreePropType) {

    const {
        newFolderName = 'New folder', // Название новой папки
        newFileName = 'New file', // Название нового файла
    } = props

    const after: DragFilesTreeType.After = {
        newFolderName,
        newFileName,
        addingNewItem: props.afterAddingNewItem,
        selectItem: props.afterSelectItem,
        collapseFolder: props.afterCollapseFolder,
        changingTree: props.afterChangingTree,
        deleteItem: props.afterDeleteItem
    }

    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(props.items)

    return (
        <div data-file-tree='true' style={{minWidth: minWidth}}>
            <Wrapper b={10}>
                <Button
                    text={newFolderName}
                    icon='btnSignFolder'
                    onClick={(e: any) => {
                        createNewItem(e, 'folder', null, props.items, props.setItems, after)
                    }}
                />
            </Wrapper>
            <Wrapper b={10}>
                <Button
                    text={newFileName}
                    icon='btnSignAdd'
                    onClick={(e: any) => {
                        createNewItem(e, 'file', null, props.items, props.setItems, after)
                    }}
                />
            </Wrapper>
            {generateItems(props.items, props.items, props.setItems, 0, after)}
        </div>
    )
}

/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
function generateItems(
    allItems: DragFilesTreeType.Items,
    innerItems: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    offset: number,
    after: DragFilesTreeType.After
): ReactNode {
    if (!allItems) return null

    return innerItems.map(itemData => {

        // Массив файлов и папок вложенный в эту папку
        let innerItems: null | ReactNode = null
        if (itemData.open && itemData.content) {
            innerItems = generateItems(
                allItems,
                itemData.content,
                setItems,
                offset + 1,
                after
            )
        }

        return (
            <Fragment key={itemData.uuid}>
                <Item
                    items={allItems}
                    itemData={itemData}
                    setItems={setItems}
                    offset={offset}
                    after={after}
                />
                {innerItems}
            </Fragment>
        )
    })
}
