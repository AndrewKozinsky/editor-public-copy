//@ts-ignore
import {createEvent, createStore} from 'effector'
import DragFilesTreeType from 'libs/DragFilesTree/types'


// ---------------------------------------------------------------------------

// Установщик нового Состояния с папками и файлами
export const setCompItems = createEvent()

// Создание Хранилища Эффектора где будут содержаться данные по папкам шаблонов компонентов
// export const componentsTreeStore = createStore<null | DragFilesTreeType.Items>(null)
// Добавление экшена изменнеия Хранилища
componentsTreeStore
    .on(setCompItems, (state: null | DragFilesTreeType.Items, items: null | DragFilesTreeType.Items) => items)

// ---------------------------------------------------------------------------

// Установщик нового Состояния с папками и файлами
export const setArtItems = createEvent()

// Создание Хранилища Эффектора где будут содержаться данные по папкам шаблонов компонентов
export const articlesTreeStore = createStore<null | DragFilesTreeType.Items>(null)
// Добавление экшена изменнеия Хранилища
articlesTreeStore
    .on(setArtItems, (state: null | DragFilesTreeType.Items, items: null | DragFilesTreeType.Items) => items)