import React from 'react'
import NameSection from '../wrappers/NameSection/NameSection'
import ItemsList from 'common/ItemsList/ItemsList'
import { useGetSettingsItemsListProps } from './LeftPart-3-func'
import { settingsPanelMessages } from 'messages/settingsPanelMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import './LeftPart-3.scss'
import {AppStateType} from '../../store/rootReducer'
import StoreSettingsTypes from '../../store/settings/settingsTypes'
import { useSelector } from 'react-redux'


type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть третьей главной вкладки */
export default function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    let lang = useSelector<AppStateType, StoreSettingsTypes.EditorLanguage>((store) => store.settings.editorLanguage)

    const settingsPanelMsg = useGetMessages(settingsPanelMessages)

    // Аргументы для компонента выводящий список пунктов настроек
    const itemsListProps = useGetSettingsItemsListProps()

    const CN = 'left-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <NameSection header={settingsPanelMsg.header}>
                <ItemsList {...itemsListProps}/>
            </NameSection>
        </div>
    )
}
