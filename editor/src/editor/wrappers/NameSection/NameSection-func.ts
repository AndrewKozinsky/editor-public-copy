import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы заголовка компонента
 * @param {Number} type — тип компонента. 1 — большой, 2 — мелкий компонент
 */
export function getHeaderClasses(type: number) {

    // Классы обёртки
    const CN = 'name-section'

    // Классы заголовка
    // Вида: name-section__header name-section__header--type1
    const classes = [`${CN}__header`]
    classes.push(`${CN}__header--type${type}`)

    return makeCN(classes)
}
