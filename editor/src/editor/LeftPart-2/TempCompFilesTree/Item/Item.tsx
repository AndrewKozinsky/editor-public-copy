import React, {ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {
    getTriangleBtnClasses,
    useGetToggleFolder,
    useGetOnClickHandler
} from './Item-func'
import { componentsPanelMessages } from 'messages/componentsPanelMessages'
import TempCompFilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import './Item.scss'


const CN = 'temp-comp-ft-item'

type ItemPropType = {
    // Массив всех папок и файлов.
    items: TempCompFilesTreeType.Items
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        itemData,
        offset,
        after
    } = props

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, itemData, after)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            onClick={onItemClickHandler}
        >
            <div className={`${CN}__inner`}>
                <Triangle items={items} itemData={itemData} after={after} />
                <Icon itemData={itemData} />
                <Circles itemData={itemData} />
                <p className={`${CN}__item-name`}>{itemData.name}</p>
                <div className={`${CN}__right-part`}>
                    <RightButtons itemData={itemData} after={after} />
                </div>
            </div>
        </div>
    )
}

type TrianglePropType = {
    // Массив всех папок и файлов.
    items: TempCompFilesTreeType.Items
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props: TrianglePropType) {
    const {
        items,
        itemData,
        after
    } = props

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.uuid, items, after)

    // Классы кнопки сворачивания папки
    const triangleBtnClasses = getTriangleBtnClasses(CN, itemData)

    if (itemData.type === 'file') {
        return <div className={triangleBtnClasses} />
    }

    return (
        <button
            className={triangleBtnClasses}
            onClick={toggleFolder}
            data-ft-item-btn='true'
        >
            <SvgIcon type='filesTreeTriangle' />
        </button>
    )
}


type IconPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const {
        itemData
    } = props

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={`${CN}__folder-sign`} />
}


type CirclesPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
}

function Circles(props: CirclesPropType) {
    const {
        itemData
    } = props

    let afterClasses = [`${CN}__circle`]
    if (itemData.afterButtonAllowed) {
        afterClasses.push(`${CN}__circle--visible`)
    }

    let insideClasses = [`${CN}__circle`]
    if (itemData.insideButtonAllowed) {
        insideClasses.push(`${CN}__circle--visible`)
    }

    return (
        <div className={`${CN}__circles`}>
            <div className={ makeCN(afterClasses) } />
            <div className={ makeCN(afterClasses) } />
            <div className={ makeCN(insideClasses) } />
        </div>
    )
}

type RightButtonsPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        itemData,
        after,
    } = props

    if (itemData.type === 'folder' || !itemData.afterButtonAllowed && !itemData.insideButtonAllowed) {
        return null
    }

    const afterButtons: ReactNode[] = []
    if (itemData.afterButtonAllowed) {
        afterButtons.push(
            <button
                className={`${CN}__btn ${CN}__right-btn`}
                onClick={(e) => after.afterClickBeforeBtn(itemData.uuid)}
                title={componentsPanelMessages.beforeButton}
                key={1}
            >
                <SvgIcon type='filesTreeUp' />
            </button>
        )
        afterButtons.push(
            <button
                className={`${CN}__btn ${CN}__right-btn`}
                onClick={(e) => after.afterClickAfterBtn(itemData.uuid)}
                title={componentsPanelMessages.afterButton}
                key={2}
            >
                <SvgIcon type='filesTreeDown' />
            </button>
        )
    }

    let insideButtonClasses = [`${CN}__btn`, `${CN}__right-btn`]
    if (!itemData.insideButtonAllowed) {
        insideButtonClasses.push(`${CN}__right-btn--invisible`)
    }

    const insideButton = (
        <button
            className={ makeCN(insideButtonClasses) }
            onClick={(e) => after.afterClickInsideBtn(itemData.uuid)}
            title={componentsPanelMessages.insideButton}
            key={3}
        >
            <SvgIcon type='filesTreeTorus' />
        </button>
    )

    return (
        <>
            {afterButtons}
            {insideButton}
        </>
    )
}
