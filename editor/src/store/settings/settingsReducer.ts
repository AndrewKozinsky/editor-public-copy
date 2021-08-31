import { setInLocalStorage } from 'utils/MiscUtils'
import StoreSettingsTypes from './settingsTypes'

export type SettingsReducerType = {
    editorLanguage: StoreSettingsTypes.EditorLanguage
    editorTheme: StoreSettingsTypes.EditorTheme
    entryAndEditorViewState: StoreSettingsTypes.EntryAndEditorViewState
    lastAddress: string
    mainTab: StoreSettingsTypes.MainTab
    settingsPanelTab: StoreSettingsTypes.SettingsPanelTab
}

// Изначальные значения
const initialState: SettingsReducerType = {
    // Язык интерфейса: eng или rus
    editorLanguage: 'eng',
    // Тема интерфейса: light или dark
    editorTheme: 'light',
    // Компоненты форм входа и редактор всегда отрисовываются.
    // Эта настройка задаёт какой компонент должен при отрисовке возвращать null.
    // Что должно быть быть показано: формы входа (entry), плавный переход к формам входа (toEntry),
    // плавный пехоход к редактору (toEditor), редактор(editor)
    entryAndEditorViewState: null,
    // Адрес последней страницы на которой был пользователь. Отсчёт ведётся от страницы редактора. Напр.: /enter
    // Это нужно для анимированного появления страницы редактора и страниц входа.
    lastAddress: '',
    // Номер открытой вкладки
    mainTab: 0,
    // Активная вкладка панели «Настройки»: user или editor
    settingsPanelTab: 'user'
}

// Установка языка интерфейса
function setEditorLanguage(state: SettingsReducerType, action: StoreSettingsTypes.SetEditorLanguageAction): SettingsReducerType {
    // Поставить язык в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorLanguage', action.payload)

    return {
        ...state,
        editorLanguage: action.payload
    }
}

// Установка темы интерфейса
function setEditorTheme(state: SettingsReducerType, action: StoreSettingsTypes.SetEditorThemeAction): SettingsReducerType {
    // Поставить тему в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorTheme', action.payload)

    return {
        ...state,
        editorTheme: action.payload
    }
}

// Установка должна быть показана формы входа, редактор или переход между ними
function setEntryAndEditorViewState(state: SettingsReducerType, action: StoreSettingsTypes.SetEntryAndEditorViewStateAction): SettingsReducerType {
    return {
        ...state,
        entryAndEditorViewState: action.payload
    }
}

// Установка адреса последней страницы
function setLastAddress(state: SettingsReducerType, action: StoreSettingsTypes.SetLastAddressAction): SettingsReducerType {
    return {
        ...state,
        lastAddress: action.payload
    }
}

// Установка адреса последней страницы
function setMainTab(state: SettingsReducerType, action: StoreSettingsTypes.SetMainTabAction): SettingsReducerType {
    // Поставить язык в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorTab', action.payload)

    return {
        ...state,
        mainTab: action.payload
    }
}
// Установка id вкладки в Настройках
function setSettingsPanelTab(state: SettingsReducerType, action: StoreSettingsTypes.SetSettingsPanelTabAction): SettingsReducerType {
    // Поставить id вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorSettingsTabId', action.payload)

    return {
        ...state,
        settingsPanelTab: action.payload
    }
}


// Редьюсер Store.settings
export default function settingsReducer(state = initialState, action: StoreSettingsTypes.SettingsAction): SettingsReducerType {

    switch (action.type) {
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE:
            return setEditorLanguage(state, action)
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME:
            return setEditorTheme(state, action)
        case StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE:
            return setEntryAndEditorViewState(state, action)
        case StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS:
            return setLastAddress(state, action)
        case StoreSettingsTypes.SETTINGS_SET_MAIN_TAB:
            return setMainTab(state, action)
        case StoreSettingsTypes.SETTINGS_SET_SETTINGS_PANEL_TAB:
            return setSettingsPanelTab(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
