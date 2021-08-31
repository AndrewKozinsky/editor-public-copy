import { makeCN } from 'utils/StringUtils'

export function useGetItemClasses(isActive: boolean = false): string {

    // Классы кнопки
    const CN = 'items-list__item'
    const classes = [CN]

    // Если кнопка выделена
    if (isActive) classes.push(`${CN}--active`)

    return makeCN(classes)
}
