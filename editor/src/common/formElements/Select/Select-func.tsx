import React from 'react'
import { makeCN } from 'utils/StringUtils'
import { MiscTypes } from 'types/miscTypes'
import { OptionsType } from './SelectTypes'


/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {Boolean} isFocus — находится ли <select> в фокусе.
 */
export function getWrapperClasses(isFocus: boolean) {

    // Классы обёртки
    const CN = 'select-input-wrapper'
    const classes = [CN]

    // Если есть фокусировка
    if (isFocus)  classes.push(`${CN}--focus`)

    return makeCN(classes)
}


/**
 * Функция возращает массив тегов <option>
 * @param {Array} options — массив пунктов выпадающего списка
 */
export function getOptions(options: OptionsType) {

    // Генерация массива тегов <option>
    return options.map(function (option, i) {

        // Атрибуты <option>
        const optionAttrs: MiscTypes.ObjStringKeyAnyVal = {
            value: option.value,
            key: i
        }

        // Если <option> заблокирован
        if (option.disabled) optionAttrs.disabled = true

        return <option {...optionAttrs}>{option.label}</option>
    })
}
