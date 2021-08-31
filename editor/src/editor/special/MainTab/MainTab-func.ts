import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы вкладки.
 * @param {Boolean} active — текущая ли кнопка вкладки
 * @param {String} position — Положение вкладки влияет на расположение полукруглых элементов
 */
export function getTabClasses(active: boolean, position: 'top' | 'left') {

    // Классы кнопки вкладки
    const CN = 'main-tab'
    const classes = [CN]

    // Если активна
    if (active) classes.push(`${CN}--active`)

    // Позиция кнопки
    classes.push(`${CN}--${position}-position`)

    return makeCN(classes)
}
