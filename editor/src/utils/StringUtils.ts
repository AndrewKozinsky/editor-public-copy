// ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ

/**
 * Функция принимает массив строк и формирует из них
 * строку разделённую пробелами для формирования классов CSS.
 * @param {Array} classesArr
 */
export function makeCN(classesArr: string[]) {
    // Сформировать новый массив классов без пустых значений
    const filteredClassesArr = classesArr.filter(cls => {
        return (cls && cls !== '')
    })

    return filteredClassesArr.join(' ')
}

export function getCN(CN: string): any {
    const classObject = {cls: CN}

    return new Proxy(classObject, {
        get(target, prop) {
            if (prop.toString() === 'root') {
                return CN
            }
            return target.cls + transformClassName(prop.toString())
        }
    })
}

// desc -> __desc
// cardDesc -> __card-desc
// cardDesc_bold -> __card-desc--bold
function transformClassName(shortCN: string) {
    const parts = shortCN.split('_')

    let resultStr = '__' + parts[0]
    if (parts[1]) resultStr += '--' + convertToSnakeCase(parts[1])

    return resultStr
}


/** Функция возвращает случайный идентификатор */
export function getRandomId() {
    const randomNum = Math.random() * 100000
    return 'id' + Math.round(randomNum)
}

/**
 * Функция принимает почту и возвращает домен
 * @param {String} email — почта
 */
export function getDomainFromEmail(email: string) {
    return email.split('@')[1]
}


/**
 * Функция принимает строку вида box-shadow и превращает её в boxShadow.
 * @param {String} str — строка, которую нужно перевести в верблюжью нотацию.
 * @returns {String} — возвращает строку переведённую в верблюжью нотацию.
 */
export function convertToCamelCase(str: string) {
    // box-shadow -> boxShadow

    let arr = str.split('-');

    arr = arr.map((str, i) => {
        if(i > 0) return str[0].toUpperCase() + str.substr(1);
        return str
    });

    return arr.join('')
}

function convertToSnakeCase(str: string) {
    if (!str) return null

    // boxShadow -> box-shadow
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
