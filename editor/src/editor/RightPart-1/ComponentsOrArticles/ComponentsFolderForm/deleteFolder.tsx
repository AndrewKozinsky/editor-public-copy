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
import { componentsTreeStore, setCompItems } from '../stores'
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages'


export default function ModalContent() {
    const dispatch = useDispatch()

    // Массив папок и файлов из Хранилища
    const componentsItems = useStore(componentsTreeStore)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppStateType) => store.sites.componentsSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {
        // Удалить папку из Хранилища и возвратить новый массив
        const newItems = filesTreePublicMethods.deleteItem(componentsItems, currentCompItemId)
        // Сохранить новые данные в Хранилище
        setCompItems(newItems)
        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer('components', newItems)
        // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах
        // потому что папка удалена
        dispatch(actions.sites.setCurrentComp(null, null))

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{componentFolderFormMessages.deleteFolderConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={componentFolderFormMessages.closeDeleteFolderModalBtn}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={componentFolderFormMessages.deleteFolderBtnInModal}
                    color='accent'
                    onClick={deleteFolder}
                />
            </Wrapper>
        </>
    )
}
