import { useDispatch, useSelector } from 'react-redux'
import { ItemsListPropType, ItemType } from 'common/ItemsList/ItemsList'
import { AppStateType } from 'store/rootReducer'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import { settingsPanelMessages } from 'messages/settingsPanelMessages'
import useGetMessages from 'messages/fn/useGetMessages'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
export function useGetSettingsItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    const settingsPanelMsg = useGetMessages(settingsPanelMessages)

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppStateType) => store.settings.settingsPanelTab)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(settingsPanelMsg), // Список пунктов
        activeItemId: activeTab // id активного пункта
    }
}

/** Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки» */
function getItemsListProps(settingsPanelMsg: any): ItemType[] {
    return [
        {
            id: 'user',
            name: settingsPanelMsg.leftMenuItemUser,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTab('user') )
        },
        {
            id: 'editor',
            name: settingsPanelMsg.leftMenuItemEditor,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTab('editor') )
        }
    ]
}
