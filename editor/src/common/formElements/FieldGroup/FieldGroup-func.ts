import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы обёртки полей ввода
 * @param {Boolean} vertical — Are the inputs arranged vertically?
 * @param {Number} gap — отступ между элементами внутри компонента.
 */
export function getFieldGroupClasses(vertical: boolean, gap?: number) {
    // Классы
    const CN = 'field-wrapper'
    const classes = [CN]

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (vertical) classes.push(CN + '--vertical')
    if (gap) classes.push(CN + '--gap' + gap)

    return makeCN(classes)
}
