import {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {AppStateType} from 'store/rootReducer'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { mainTabsMessages } from 'messages/mainTabsMessages'
import { MainTabDataType } from '../MainTab/MainTab'
import useGetMessages from 'messages/fn/useGetMessages'


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {

    const mainTabsMsg = useGetMessages(mainTabsMessages)

    // Номер активной вкладки
    const { mainTab } = useSelector((store: AppStateType) => store.settings)

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(mainTab, mainTabsMsg) )
    }, [mainTab])

    return tabsData
}

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} activeTabNum — номер активной вкладки
 */
function getTabData( activeTabNum: number, mainTabsMsg: any ): MainTabDataType[] {

    // Сгенеривать данные трёх вкладок
    return ['mainTabMaterials', 'mainTabEditor', 'mainTabSettings', 'mainTabHelp']
        .map((type, i) => {
        return {
            // num: i + 1, // I think I can delete it
            title: mainTabsMsg[type],
            iconType: type,
            active: i === activeTabNum,
            position: <'top'|'left'>'top',
            onClick: () => store.dispatch(actions.settings.setMainTab(i))
        }
    })
}
