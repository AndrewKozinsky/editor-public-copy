
/**
 * Функция создаёт копию объекта без определённых свойств. Работает со свойствами первого уровня.
 * @param {Object} obj — объект, из которого нужно сделать копию
 * @param {Array} excludedProps — массив с названиями свойст, которые не должны быть в новом объекте
 */
export function copyObjWithoutSomeProps(obj: {[prop:string]: any}, excludedProps: string[]) {

    return Object.assign(
        {},
        ...excludedProps.map(prop => {
            if (obj[prop]) return {[prop]: obj[prop]}
            else return {}
        })
    )
}
