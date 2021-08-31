import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import { saveItemsOnServer } from '../FoldersList/FoldersList-func'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { articlesTreeStore, setArtItems } from '../stores'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'
import { store } from 'store/rootReducer'


export default function ModalContent() {
    const dispatch = useDispatch()

    // Массив папок и файлов из Хранилища
    const articlesItems = useStore(articlesTreeStore)

    // id папки или компонента, который должнен быть выделен
    const {currentArtItemId} = useSelector((store: AppStateType) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {
        // Удалить папку из Хранилища и возвратить новый массив
        const newItems = filesTreePublicMethods.deleteItem(articlesItems, currentArtItemId)

        // If the opened article is not in new items array then it is in the deleted folder,
        // then clear article editor because the article will be deleted.
        if ( filesTreePublicMethods.getItemById(newItems, store.getState().article.articleUuId) ) {
            store.dispatch( actions.article.clearArticle() )
        }

        // Сохранить новые данные в Хранилище
        setArtItems(newItems)

        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer('articles', newItems)

        // Обнулить свойство указывающее на uuid активного пункта в папках и статьях
        // потому что папка удалена
        dispatch(actions.sites.setCurrentArt(null, null))

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{articleFolderFormMessages.deleteFolderConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={articleFolderFormMessages.closeDeleteFolderModalBtn}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={articleFolderFormMessages.deleteFolderBtnInModal}
                    color='accent'
                    onClick={deleteFolder}
                />
            </Wrapper>
        </>
    )
}
