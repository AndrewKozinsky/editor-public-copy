import articleActions from './article/articleActions'
import modalActions from './modal/modalActions'
import settingsActions from './settings/settingsActions'
import sitesActions from './site/sitesActions'
import userActions from './user/userActions'

const actions = {
    user: userActions,
    sites: sitesActions,
    settings: settingsActions,
    article: articleActions,
    modal: modalActions,
}

export default actions
