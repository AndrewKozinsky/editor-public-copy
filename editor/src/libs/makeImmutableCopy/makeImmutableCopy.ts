
/**
 * Функция создаёт неизменяемую (immutable) копию переданных данных и заменяет один объект на переданный.
 * @param {Object || Array} mainData — объект или массив где внутри есть объект, который должен быть скопирован.
 * @param {Object || Array} originalData — объект или массив, который должен быть скопирован.
 * @param {Object || Array} changedData — изменённый объект или массив
 * @param {Object || Array} [newData] — в процессе работы функция создаёт объект или массив с копией. Это служебный аргумент. Сюда передавать ничего не нужно.
 * @returns {Object || Array} — функция возвращает неизменяемую копию из аргумента mainData.
 */
export default function makeImmutableObj(mainData: any, originalData: any, changedData: any, newData?: any) {

    // Если mainData равен originalData, тогда вернуть изменённый объект
    if(mainData === originalData) {
        return changedData
    }


    // Есть в mainData нет целевого объекта, то вернуть переданный mainData
    if(!isDataHasOriginalData(mainData, originalData)) return mainData


    // В mainData есть целевой объект...


    // Если это массив...
    if(toString.call(mainData) === "[object Array]") {

        // Скопировать массив и вставить как значение возвращаемого объекта
        newData = mainData.concat()

        // Перебрать элементы массива
        for(let i = 0; i < newData.length; i++) {
            // Перебираемый элемент
            let elem = newData[i]

            // Если в структуре элемента массива есть целевой объект
            newData[i] = makeImmutableObj(elem, originalData, changedData, newData)
        }
    }


    // Если это объект...
    if(toString.call(mainData) === "[object Object]") {

        // Скопировать объект и вставить как значение возвращаемого объекта
        newData = Object.assign({}, mainData)

        // Перебрать все элементы объекта
        for(let key in mainData) {
            // Перебираемый элемент
            let elem = mainData[key]

            // Тогда заменить его на копию
            newData[key] = makeImmutableObj(elem, originalData, changedData, newData)
        }
    }


    return newData
}



/**
 * Функция проверяет есть ли в данных другие данные
 * @param {Object || Array} currentData — объект или массив где нужно найти другой объект.
 * @param {Object || Array} originalData — объект/массив, который может быть в currentData.
 * @returns {Boolean} — возвращает булево значение есть ли в currentData объект originalData.
 */
function isDataHasOriginalData(currentData: any, originalData: any) {

    // Если текущий объект равен целевому объекту, то вернуть правду
    if(currentData === originalData) return true;


    // Если это массив
    if(toString.call(currentData) === "[object Array]") {

        // Перебрать все элементы массива...
        for(let i = 0; i < currentData.length; i++) {

            // ... и передать элемент на проверку.
            if(isDataHasOriginalData(currentData[i], originalData)) {
                return true
            }
        }
    }


    // Если это объект
    if(toString.call(currentData) === "[object Object]") {

        // Перебрать все свойства объекта
        for(let key in currentData) {

            // ... и передать значение свойства на проверку.
            if(isDataHasOriginalData(currentData[key], originalData)) {
                return true
            }
        }
    }


    // Во всех остальных случаях вернуть ложь
    return false
}
