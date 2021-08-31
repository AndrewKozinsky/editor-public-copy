import { makeCN } from 'utils/StringUtils'
import { WrapperPropType } from './Wrapper'

/**
 * Функция возвращает классы универсальной обёртки
 * @param {Object} wrapperProps — props переданные в обёртку
 * @param {Number} gap — отступ между элементами внутри компонента.
 */
export function getWrapperClasses(wrapperProps: WrapperPropType, gap?: number) {
    const {
        align,
        t,        // Отступ сверху
        b         // Отступ снизу
    } = wrapperProps


    const CN = 'wrapper'
    let classes = [CN]

    // Добавление класса дающую выравнивание
    if (align) classes.push(CN + '--align-' + align)

    // Добавление класса дающего верхний оступ
    if (t) classes.push(CN + '--t' + t)

    // Добавление класса дающего нижний оступ
    if (b) classes.push(CN + '--b' + b)

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (gap) classes.push(CN + '--gap' + gap)

    return makeCN(classes)
}
