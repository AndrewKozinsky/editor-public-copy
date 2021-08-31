import {makeCN} from 'utils/StringUtils'

/**
 * Функция возвращает классы заголовка
 * @param {String} type — тип заголовка. Он задаёт размер текста
 */
export function getHeaderClasses(type: string) {
    // Классы
    const CN = 'header'
    const classes = [CN]

    // Размер заголовка.
    // Получится строка вида
    // header--h1 или header--h2
    classes.push(`${CN}--${type}`)

    return makeCN(classes)
}
