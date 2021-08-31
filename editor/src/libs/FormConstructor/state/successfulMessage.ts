import FCType from '../FCType'
import { store } from 'store/rootReducer'

/**
 * The function returns status of whether success message can be shown
 * @param {Object} formConfig — configuration form object
 */
export function getInitialShowCommonSuccess(formConfig: FCType.Config) {
    return !!formConfig.showCommonSuccess
}

/**
 * The function returns common success message
 * @param {Object} formConfig — configuration form object
 */
export function getInitialCommonSuccess(formConfig: FCType.Config) {
    const lang = store.getState().settings.editorLanguage

    if (formConfig.commonSuccess) {
        return formConfig.commonSuccess
    }

    if (lang === 'rus') return 'Успешно'
    return 'Successfully'
}
