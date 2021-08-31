import React, { ReactElement } from 'react'
import { useGetPageClasses } from './EditorMain-func'
import EditorPartProvider from 'editor/special/EditorPartProvider/EditorPartProvider'
import SectionsTabs from 'editor/special/SectionsTabs/SectionsTabs'
import Modal from 'common/modalEntities/Modal/Modal'
import './EditorMain.scss'


/** Главная страница редактора. */
export default function EditorMain(): ReactElement {

    const CN = 'editor-main'
    // Классы обёртки и видим ли редактор
    const { classes, isVisible } = useGetPageClasses(CN)

    // Ничего не отрисовывать если редактор не должен быть видим.
    if (!isVisible) return null

    return (
        <>
            <div className={classes}>
                <div className={`${CN}__left`}>
                    <SectionsTabs />
                    <EditorPartProvider position='left' />
                </div>
                <div className={`${CN}__right`}>
                    <EditorPartProvider position='right' />
                </div>
            </div>
            <Modal />
        </>
    )
}
