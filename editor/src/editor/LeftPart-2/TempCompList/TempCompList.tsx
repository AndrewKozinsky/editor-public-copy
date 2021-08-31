import React from 'react'
import TempCompFilesTree from '../TempCompFilesTree/TempCompFilesTree/TempCompFilesTree'
import {
    useGetTempCompsFolders,
    useGetAfterCollapseFolder,
    useGetOnClickBeforeBtn,
    useGetOnClickInsideBtn,
} from './TempCompList-func'


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function TempCompList() {

    // Get and prepare templates array for <TempCompFilesTree>
    const tempCompsFolders = useGetTempCompsFolders()

    // The function runs after folder was open or collapsed
    const afterCollapseFolder = useGetAfterCollapseFolder()

    // On click handlers
    const onClickBeforeBtn = useGetOnClickBeforeBtn('before')
    const onClickAfterBtn = useGetOnClickBeforeBtn('after')
    const onClickInsideBtn = useGetOnClickInsideBtn()

    return (
        <TempCompFilesTree
            items={tempCompsFolders}
            afterCollapseFolder={afterCollapseFolder}
            afterClickBeforeBtn={onClickBeforeBtn}
            afterClickAfterBtn={onClickAfterBtn}
            afterClickInsideBtn={onClickInsideBtn}
        />
    )
}
