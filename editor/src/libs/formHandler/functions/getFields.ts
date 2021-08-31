import FHTypes from '../types'


/**
 * Функция возращает данные по полям
 * @param {Object} formState — объект Состояния формы
 */
export default function getFields(formState: FHTypes.FormState): FHTypes.ReturnFieldsObj {
    // Формирование объекта с данными о полях
    const fields: FHTypes.ReturnFieldsObj = {}

    for(let key in formState.fields) {
        fields[key] = {
            value: formState.fields[key].value,
            data: formState.fields[key].data
        }
    }

    return fields
}
