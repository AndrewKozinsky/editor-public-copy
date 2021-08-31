import React from 'react'
import DragFilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import SvgIcon from 'common/icons/SvgIcon'
import {
    createNewItem,
    getInnerWrapperClasses,
    getTriangleBtnClasses,
    useGetToggleFolder,
    useMarkItemElemWhenItHovered,
    useGetOnClickHandler,
    removeItem
} from './Item-func'
import {
    handleDragStart,
    handleDrag,
    handleDragOver,
    handleDragEnd,
} from './dragAndDrop'
import './Item.scss'


const CN = 'ft-item'

type ItemPropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        setItems,
        itemData,
        offset,
        after
    } = props

    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered()

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, setItems, itemData, after)

    // Классы внутренней обёртки
    const innerWrapperClasses = getInnerWrapperClasses(CN, itemData)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            data-ft-item={itemData.uuid}
            draggable='true'
            onClick={onItemClickHandler}
            onMouseOver={markItemElem}
            onMouseOut={markItemElem}
            onDragStart={handleDragStart}
            onDrag={(e: any) => handleDrag(e, itemData, items, setItems)}
            onDragOver={handleDragOver}
            onDragEnd={(e: any) => handleDragEnd(e, itemData, items, setItems, after)}
        >
            <div
                className={innerWrapperClasses}
                data-ft-inner='true'
            >
                <PlaceArrow itemData={itemData} />
                <Triangle items={items} setItems={setItems} itemData={itemData} after={after} />
                <Icon itemData={itemData} />
                {itemData.name}
                <div className={`${CN}__right-part`}>
                    <RightButtons items={items} setItems={setItems} itemData={itemData} after={after} />
                </div>
            </div>
        </div>
    )
}

type TrianglePropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props: TrianglePropType) {
    const {
        items,
        setItems,
        itemData,
        after
    } = props

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.uuid, items, setItems, after)

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
    itemData: DragFilesTreeType.Item
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const {
        itemData
    } = props

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={`${CN}__folder-sign`} />
}

type RightButtonsPropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        items,
        setItems,
        itemData,
        after,
    } = props

    const createFile = (
        <button
            className={`${CN}__btn ${CN}__right-btn`}
            data-ft-item-btn='true'
            onClick={(e: any) => createNewItem(e, 'folder', itemData, items, setItems, after)}
        >
            <SvgIcon type='filesTreeFolderPlus' />
        </button>
    )

    const createFolder = (
        <button
            className={`${CN}__btn ${CN}__right-btn`}
            data-ft-item-btn='true'
            onClick={(e: any) => createNewItem(e, 'file', itemData, items, setItems, after)}
        >
            <SvgIcon type='filesTreePlus' />
        </button>
    )

    const deleteItem = (
        <button
            className={`${CN}__btn ${CN}__right-btn`}
            data-ft-item-btn='true'
            onClick={(e: any) => removeItem(e, items, setItems, itemData.uuid, after)}
        >
            <SvgIcon type='filesTreeTrash' />
        </button>
    )

    if (itemData.type === 'file') {
        return deleteItem
    }
    else {
        return (
            <>
                {createFile}
                {createFolder}
                {deleteItem}
            </>
        )
    }
}


type PlaceArrowPropType = {
    // Данные папки или файла
    itemData: DragFilesTreeType.Item
}

/** Полоска указывающая на место, куда будет поставлен перетаскиваемый элемент */
function PlaceArrow(props: PlaceArrowPropType) {
    const { placeMark } = props.itemData

    const CN = 'ft-place-arrow'
    const classes = [CN]
    if (placeMark === 'before') classes.push(`${CN}--before`)
    if (placeMark === 'after') classes.push(`${CN}--after`)

    if (!placeMark || placeMark === 'inside') return null

    return (
        <div className={makeCN(classes)}>
            <SvgIcon type='filesTreePlaceMark' extraClass={`${CN}__pointer`} />
            <div className={`${CN}__line`} />
        </div>
    )
}
