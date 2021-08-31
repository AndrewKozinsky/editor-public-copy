import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import ComponentForm from './ComponentForm/ComponentForm'
import ComponentsFolderForm from './ComponentsFolderForm/ComponentsFolderForm'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования компонента в зависимости от выбранного элемента
 */
export default function ComponentFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const {currentCompItemType} = useSelector((store: AppStateType) => store.sites.componentsSection)

    if (currentCompItemType === 'folder') return <ComponentsFolderForm />
    if (currentCompItemType === 'file') return <ComponentForm />
    return null
}
