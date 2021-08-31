// Types
import StoreSettingsTypes from './settingsTypes'

const settingsActions = {

    // Установка языка интерфейса
    setEditorLanguage(payload: StoreSettingsTypes.EditorLanguage): StoreSettingsTypes.SetEditorLanguageAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE,
            payload
        }
    },

    // Установка темы интерфейса
    setEditorTheme(payload: StoreSettingsTypes.EditorTheme): StoreSettingsTypes.SetEditorThemeAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME,
            payload
        }
    },

    // Установка должна быть показана формы входа, редактор или переход между ними
    setEntryAndEditorViewState(payload: StoreSettingsTypes.EntryAndEditorViewState): StoreSettingsTypes.SetEntryAndEditorViewStateAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE,
            payload
        }
    },

    // Установка адреса последней страницы
    setLastAddress(payload: string): StoreSettingsTypes.SetLastAddressAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS,
            payload
        }
    },

    // Установка номера последней вкладки
    setMainTab(payload: StoreSettingsTypes.MainTab): StoreSettingsTypes.SetMainTabAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_MAIN_TAB,
            payload
        }
    },

    // Установка номера последней вкладки
    setSettingsPanelTab(payload: StoreSettingsTypes.SettingsPanelTab): StoreSettingsTypes.SetSettingsPanelTabAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_SETTINGS_PANEL_TAB,
            payload
        }
    },
}

export default settingsActions