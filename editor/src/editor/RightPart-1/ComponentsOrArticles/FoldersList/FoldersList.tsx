import React from 'react'
//@ts-ignore
import {useStore} from 'effector-react'
import DragFilesTree from 'libs/DragFilesTree/DragFilesTree/DragFilesTree'
import { FolderType } from '../types'
import {
    useGetFoldersFromServerAndPutInEffector,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewItem,
    saveItemsOnServer,
    afterDeleteItem
} from './FoldersList-func'
import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'
import { foldersArticlesSectionMessages } from 'messages/foldersArticlesSectionMessages'
import { foldersComponentsSectionMessages } from 'messages/foldersComponentsSectionMessages'
import {useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'


type FoldersListPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}

/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function FoldersList(props: FoldersListPropType) {
    const { type } = props

    // Получение с сервера порядка следования папок и установка в Эффектор
    // SET ALL DATA TO REDUX!!!
    useGetFoldersFromServerAndPutInEffector(type)

    // Папки компонентов из Эффектора
    let store = componentsTreeStore
    if(type === 'articles') store = articlesTreeStore
    const items = useStore(store)

    // Установщик Состояния папок
    let setItems = setCompItems
    if(type === 'articles') setItems = setArtItems

    // Название папки
    let newFolderName = foldersComponentsSectionMessages.createNewFolderBth
    if(type === 'articles') newFolderName = foldersArticlesSectionMessages.createNewFolderBth

    // Название файла
    let newFileName = foldersComponentsSectionMessages.createNewFileBth
    if(type === 'articles') newFileName = foldersArticlesSectionMessages.createNewFileBth

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick(type)

    return (
        <DragFilesTree
            items={items}
            setItems={setItems}
            newFolderName={newFolderName}
            newFileName={newFileName}
            afterAddingNewItem={(items, item) => afterAddingNewItem(type, items, item)}
            afterChangingTree={(items) => saveItemsOnServer(type, items)}
            afterCollapseFolder={(arrUuId) => afterCollapseFolder(type, arrUuId)}
            afterSelectItem={onItemClick}
            afterDeleteItem={(items, itemUuid) => afterDeleteItem(type, items, itemUuid)}
        />
    )
}
