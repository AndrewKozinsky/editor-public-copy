import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import {saveItemsOnServer} from 'editor/RightPart-1/ComponentsOrArticles/FoldersList/FoldersList-func'
import deleteArticleRequest from 'src/requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'src/requests/editor/components/deleteComponentRequest'
import { articleFormMessages } from 'messages/articleFormMessages'
import {componentFormMessages} from 'messages/componentTemplateFormMessages'


type DeleteItemModalPropType = {
    type: 'component' | 'article' // Что удалять: Шаблон компонента или статью?
}

/** Модальное окно с формой подтверждения и удаления шаблона компонента или статьи */
export default function DeleteItemModal(props: DeleteItemModalPropType) {
    const { type } = props

    const dispatch = useDispatch()

    // Массив папок и файлов из Хранилища
    const componentsItems = useStore(componentsTreeStore)
    const articlesItems = useStore(articlesTreeStore)

    // uuid выделенного компонента или статьи
    const {currentCompItemId} = useSelector((store: AppStateType) => store.sites.componentsSection)
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    // Функция удаляющая выделенный компонент или статью
    const deleteItem = useCallback(async function () {

        if (type === 'component') {
            // Удалить компонент или статью из Хранилища и возвратить новый массив
            const newItems = filesTreePublicMethods.deleteItem(componentsItems, currentCompItemId)
            // Сохранить новые данные в Хранилище
            setCompItems(newItems)
            // Сохранить новый массив папок и файлов на сервере
            await saveItemsOnServer('components', newItems)
            // Удалить компонент на сервере
            await deleteComponentRequest(currentCompItemId)
            // Обнулить свойство указывающее на uuid активного компонента потому что он удаленён
            dispatch(actions.sites.setCurrentComp(null, null))
        }
        // Аналогично для статей
        else {
            const newItems = filesTreePublicMethods.deleteItem(articlesItems, currentArtItemId)
            setArtItems(newItems)
            await saveItemsOnServer('articles', newItems)
            await deleteArticleRequest(currentArtItemId)
            dispatch(actions.sites.setCurrentArt(null, null))
        }

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    // Текст с подтверждением удаления компонента или статьи
    let confirmationText = (type === 'component')
        ? componentFormMessages.deleteComponentConfirmationTextInModal
        : articleFormMessages.deleteArticleConfirmationTextInModal

    // Текст на кнопке отмены удаления
    const closeBtnText = (type === 'component')
        ? componentFormMessages.closeDeleteComponentModalBtn
        : articleFormMessages.closeDeleteArticleModalBtn

    // Текст на кнопке подтверждения удаления
    const agreeBtnText = (type === 'component')
        ? componentFormMessages.deleteComponentBtnInModal
        : articleFormMessages.deleteArticleBtnInModal

    return (
        <>
            <p>{confirmationText}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={closeBtnText}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={agreeBtnText}
                    color='accent'
                    onClick={deleteItem}
                />
            </Wrapper>
        </>
    )
}
