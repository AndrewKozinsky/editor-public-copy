import { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../store/rootAction'


/** Хук возвращает функцию открывающую модальное окно */
export function useGetModalOpenHandler() {
    const dispatch = useDispatch()

    return function (content: ReactElement) {
        dispatch(actions.modal.openModal(content))
    }
}


/**
 * Запись в localStorage данных предварительно пропущенных через JSON.stringify
 * @param {String} propName — имя свойства
 * @param {String} value — значение свойства
 */
export function setInLocalStorage(propName: string, value: any) {
    localStorage.setItem(propName, JSON.stringify(value))
}

/**
 * Получение из localStorage данных предварительно пропущенных через JSON.parse
 * @param {String} propName — имя свойства
 * @param {String} defaultValue — значение по умолчанию, которое будет возвращено
 * если в localStorage у запрашиваемого свойства нет значения.
 */
export function getFromLocalStorage(propName: string, defaultValue?: any) {
    let value = localStorage.getItem(propName)
    if (!value && defaultValue !== undefined) return defaultValue

    return JSON.parse(value)
}

/**
 * Удаление данных из localStorage
 * @param {String} propName — имя свойства
 */
export function removeFromLocalStorage(propName: string) {
    localStorage.removeItem(propName)
}

/**
 * The function create deep copy of object or array
 * @param {Object | Array} data — copied data
 */
export function createDeepCopy<T>(data: T): T {

    let f = function copy(data: T) {
        switch (toString.call(data)){
            case "[object Array]":
                return parseArray(data);
            case "[object Object]":
                return parseObj(data);
            default: return null // Возвращу null чтобы проверяльщик не ругался
        }

        function parseArray(arr: any) {
            return arr.map((elem: any) => {
                switch (toString.call(elem)){
                    case "[object Array]":
                    case "[object Object]":
                        return copy(elem);
                    default: return elem
                }
            })
        }

        function parseObj(obj: any) {
            let result = {};

            for(let key in obj) {
                switch (toString.call(obj[key])){
                    case "[object Array]":
                    case "[object Object]":
                        //@ts-ignore
                        result[key] = copy(obj[key]);
                        break;
                    default:
                        //@ts-ignore
                        result[key] = obj[key]
                }
            }
            return result;
        }
    };

    return f(data);
}
