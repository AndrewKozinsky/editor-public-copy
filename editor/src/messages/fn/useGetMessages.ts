import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'


export default function useGetMessages<T>(obj: T) {
    const lang = useSelector((store: AppStateType) => store.settings.editorLanguage)

    type ObjNextType = {
        [K in keyof T]: string | ReactElement
    }

    const objNext = {} as ObjNextType

    for (let key in obj) {
        // @ts-ignore
        objNext[key] = obj[key][lang]
    }

    return objNext
}
