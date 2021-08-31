import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {
    useGetIsButtonVisible,
    useIsDataBtnDisabled,
    useIsHistoryBtnDisabled,
    useMakeHistoryStep,
    useShowData
} from './ArticleMenu-func'
import Button from 'common/formElements/Button/Button'
import {articleMenuMessages} from 'messages/articleMenuMessages'
import './ArticleMenu.scss'
import { useIsSaveBtnDisabled, useSaveArticle } from './fn/save'
import { useCloseArticle } from './fn/close'
import useGetShowModal from '../../../utils/hooksUtils'
import {CloseArticleConfirmModal} from './fn/CloseArticleConfirmModal'
import {DeleteArticleConfirmModal} from './fn/DeleteArticleConfirmModal'
import { useIsMarkupBtnDisabled } from './fn/markup'
import {ArticleMarkupModal} from './fn/ArticleMarkupModal'


export default function ArticleMenuButton() {
    // Is the Article menu button visible
    const isVisible = useGetIsButtonVisible()

    if (!isVisible) return null

    return (
        <div className='article-menu-wrapper'>
            <button className='article-menu-button'>
                <SvgIcon type='articleMenu' />
            </button>
            <ArticleMenu />
        </div>
    )
}


function ArticleMenu() {
    const menuCN = 'article-menu'

    // Undo button
    const isUndoBtnDisabled = useIsHistoryBtnDisabled('undo')
    const makeUndoStep = useMakeHistoryStep('undo')

    // Redo function
    const isRedoBtnDisabled = useIsHistoryBtnDisabled('redo')
    const makeRedoStep = useMakeHistoryStep('redo')

    // Show markup button
    const isMarkupBtnDisabled = useIsMarkupBtnDisabled()
    const openMarkupModal = useGetShowModal(<ArticleMarkupModal />)

    // Show data button functions
    const isDataBtnDisabled = useIsDataBtnDisabled()
    const showData = useShowData()

    // Save button functions
    const isSaveBtnDisabled = useIsSaveBtnDisabled()
    const saveArticle = useSaveArticle()

    // Close article button
    const openConfirmCloseModal = useGetShowModal(<CloseArticleConfirmModal />)
    const closeArticle = useCloseArticle(openConfirmCloseModal)

    // Delete article button
    const deleteArticle = useGetShowModal(<DeleteArticleConfirmModal />)

    return (
        <div className={menuCN}>
            <div className={`${menuCN}__inner`}>
                <Button
                    text={articleMenuMessages.undo}
                    icon='btnSignUndo'
                    onClick={makeUndoStep}
                    disabled={isUndoBtnDisabled}
                />
                <Button
                    text={articleMenuMessages.redo}
                    icon='btnSignRedo'
                    onClick={makeRedoStep}
                    disabled={isRedoBtnDisabled}
                />
            </div>
            <div className={`${menuCN}__inner`}>
                <Button
                    text={articleMenuMessages.markup}
                    icon='btnSignCode'
                    onClick={openMarkupModal}
                    disabled={isMarkupBtnDisabled}
                />
                <Button
                    text={articleMenuMessages.data}
                    icon='btnSignJson'
                    onClick={showData}
                    disabled={isDataBtnDisabled}
                />
            </div>
            <div className={`${menuCN}__inner`}>
                <Button
                    text={articleMenuMessages.save}
                    icon='btnSignSave'
                    onClick={saveArticle}
                    disabled={isSaveBtnDisabled}
                />
                <Button
                    text={articleMenuMessages.close}
                    icon='btnSignCancel'
                    onClick={closeArticle}
                />
                <Button
                    text={articleMenuMessages.delete}
                    icon='btnSignTrash'
                    onClick={deleteArticle}
                />
            </div>
        </div>
    )
}
