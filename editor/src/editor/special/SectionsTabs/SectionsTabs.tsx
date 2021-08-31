import React from 'react'
import { useAppSelector } from '../../../store/rootReducer'
import ArticleMenu from '../ArticleMenu/ArticleMenu'
import MainTab, { MainTabDataType } from '../MainTab/MainTab'
import { useGetTabData } from './SectionsTabs-func'
import ArticleMenuButton from '../ArticleMenu/ArticleMenu'
import './SectionsTabs.scss'
import StoreSettingsTypes from '../../../store/settings/settingsTypes'


/** Компонент вкладок переключающих разделы радактора */
export default function SectionsTabs() {

    const CN = 'section-tabs'

    const lang = useAppSelector<StoreSettingsTypes.EditorLanguage>(store => store.settings.editorLanguage)

    // Данные для генерирования вкладок
    const tabsDataArr: MainTabDataType[] = useGetTabData()

    return (
        <div className={CN}>
            <div>
                {tabsDataArr.map(tabData => {
                    return <MainTab tabData={tabData} key={tabData.title} />
                })}
            </div>
            <ArticleMenuButton />
        </div>
    )
}

