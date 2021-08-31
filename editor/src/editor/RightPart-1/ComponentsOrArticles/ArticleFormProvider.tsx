import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import ArticleForm from './ArticleForm/ArticleForm'
import ArticlesFolderForm from './ArticlesFolderForm/ArticlesFolderForm'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования статьи в зависимости от выбранного элемента
 */
export default function ArticleFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const {currentArtItemType} = useSelector((store: AppStateType) => store.sites.articlesSection)

    if (currentArtItemType === 'folder') return <ArticlesFolderForm />
    if (currentArtItemType === 'file') return <ArticleForm />
    return null
}
