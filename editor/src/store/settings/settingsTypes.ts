
namespace StoreSettingsTypes {

    // Типы значений
    // Язык интерфейса
    export type EditorLanguage = 'eng' | 'rus'
    // Тема интерфейса
    export type EditorTheme = 'light' | 'dark'
    // Что должно быть быть показано: формы входа (entry), плавный переход к формам входа (toEntry),
    // плавный пехоход к редактору (toEditor), редактор(editor)
    // null сообщает, что еще не известно что должно быть показано и определится позже на основе открытой странице
    export type EntryAndEditorViewState = null | 'entry' | 'toEntry' | 'toEditor' | 'editor'
    // Номер открытой вкладки
    export type MainTab = number // 0 | 1 | 2
    // Активная вкладка панели «Настройки»: user или editor
    export type SettingsPanelTab = 'user' | 'editor'

    // Типы типа и тип экшена
    // Установка языка интерфейса
    export const SETTINGS_SET_EDITOR_LANGUAGE = 'SETTINGS_SET_EDITOR_LANGUAGE'
    export type SetEditorLanguageAction = {
        type: typeof SETTINGS_SET_EDITOR_LANGUAGE
        payload: EditorLanguage
    }

    // Установка темы интерфейса
    export const SETTINGS_SET_EDITOR_THEME = 'SETTINGS_SET_EDITOR_THEME'
    export type SetEditorThemeAction = {
        type: typeof SETTINGS_SET_EDITOR_THEME
        payload: EditorTheme
    }

    // Установка должны быть показаны формы входа, редактор или переход между ними
    export const SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE = 'SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE'
    export type SetEntryAndEditorViewStateAction = {
        type: typeof SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE
        payload: EntryAndEditorViewState
    }

    // Установка последней страницы
    export const SETTINGS_SET_LAST_ADDRESS = 'SETTINGS_SET_LAST_ADDRESS'
    export type SetLastAddressAction = {
        type: typeof SETTINGS_SET_LAST_ADDRESS
        payload: string
    }

    // Установка номера последней вкладки
    export const SETTINGS_SET_MAIN_TAB = 'SETTINGS_SET_MAIN_TAB'
    export type SetMainTabAction = {
        type: typeof SETTINGS_SET_MAIN_TAB
        payload: MainTab
    }

    // Установка активной вкладки панели «Настройки»
    export const SETTINGS_SET_SETTINGS_PANEL_TAB = 'SETTINGS_SET_SETTINGS_PANEL_TAB'
    export type SetSettingsPanelTabAction = {
        type: typeof SETTINGS_SET_SETTINGS_PANEL_TAB
        payload: SettingsPanelTab
    }


    export type SettingsAction =
        | SetEditorLanguageAction
        | SetEditorThemeAction
        | SetEntryAndEditorViewStateAction
        | SetLastAddressAction
        | SetMainTabAction
        | SetSettingsPanelTabAction
}

export default StoreSettingsTypes