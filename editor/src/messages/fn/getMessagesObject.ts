import { ReactElement } from 'react'
import { store } from 'store/rootReducer'


export type ObjType = {
    [key: string]: LangStringObj
}
export type JSXType = {
    [key: string]: LangJSXObj
}
export type JSXFnType = {
    [key: string]: LangJSXFnObj
}

type LangStringObj = {
    eng: string,
    rus: string
}
type LangJSXObj = {
    eng: ReactElement,
    rus: ReactElement
}
type LangJSXFnObj = (...args: any[]) => LangJSXObj

type ReturnObjType = {
    [key: string]: string
}
type ReturnJSXType = {
    [key: string]: ReactElement
}
type ReturnJSXFnType = {
    [key: string]: LangJSXFnObj
}


export function getMessagesObject(obj: ObjType) {
    const lang = store.getState().settings.editorLanguage

    let newObj: ReturnObjType = {}

    for(let key in obj) {
        if (!obj.hasOwnProperty(key)) continue

        //@ts-ignore
        newObj[key] = obj[key][lang]
    }

    return newObj
}

export function getMessagesJSXObject(obj: JSXType) {
    const lang = store.getState().settings.editorLanguage

    let newObj: ReturnJSXType = {}

    for(let key in obj) {
        if (!obj.hasOwnProperty(key)) continue

        //@ts-ignore
        newObj[key] = obj[key][lang]
    }

    return newObj
}


export function getMessagesJSXFnObject(obj: JSXFnType) {
    const lang = store.getState().settings.editorLanguage

    let newObj: ReturnJSXFnType = {}

    for(let key in obj) {
        if (!obj.hasOwnProperty(key)) continue

        const fn = obj[key]

        //@ts-ignore
        newObj[key] = new Proxy(fn, {
            apply(target, thisArg, argArray) {
                //@ts-ignore
                return target(...argArray)[lang]
            }
        })
    }

    return newObj
}
