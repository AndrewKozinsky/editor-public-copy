//@ts-ignore
import { applyMiddleware, combineReducers, createStore } from 'redux'
// Reducers
import userReducer from './user/userReducer'
import settingsReducer from './settings/settingsReducer'
import sitesReducer from './site/sitesReducer'
import articleReducer from './article/articleReducer'
import modalReducer from './modal/modalReducer'
// @ts-ignore
import { composeWithDevTools } from 'redux-devtools-extension'
// @ts-ignore
import ReduxThunk from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

// Корневой редьюсер
const rootReducer = combineReducers({
    user:  userReducer,
    sites:  sitesReducer,
    settings:  settingsReducer,
    article: articleReducer,
    modal:  modalReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
)

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector