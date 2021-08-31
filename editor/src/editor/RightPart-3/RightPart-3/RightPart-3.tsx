import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import SettingsUserTabContent from '../SettingsUserTabContent/SettingsUserTabContent'
import SettingsEditorTabContent from '../SettingsEditorTabContent/SettingsEditorTabContent'
import { userTabContentMessages } from 'messages/userTabContentMessages'
import { editorTabContentMessages } from 'messages/editorTabContentMessages'
import './RightPart-3.scss'


type RightPart3PropType = {
    display?: boolean
}

/** Правая часть третьей главной вкладки */
export default function RightPart3(props: RightPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const lang: 'rus' | 'eng' = useSelector((store: AppStateType) => store.settings.editorLanguage)

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppStateType) => store.settings.settingsPanelTab)

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(<></>)

    useEffect(function () {
        // Составление массива из двух элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = ['user', 'editor'].map((tabName) => {
            if (tabName === 'user') {
                return (
                    <HeaderPage
                        headerText={userTabContentMessages.header[lang]}
                        display={tabName === activeTab}
                        key={tabName}
                    >
                        <SettingsUserTabContent />
                    </HeaderPage>
                )
            }
            else if (tabName === 'editor') {
                return (
                    <HeaderPage
                        headerText={editorTabContentMessages.header[lang]}
                        display={tabName === activeTab}
                        key={tabName}
                    >
                        <SettingsEditorTabContent />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [activeTab, lang])

    const CN = 'right-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {partComponents}
        </div>
    )
}
