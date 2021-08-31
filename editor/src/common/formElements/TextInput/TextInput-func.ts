import { useEffect } from 'react'
import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы выпадающего списка
 * @param maxWidth — максимальная ширина поля.
 */
export function getTextInputClasses(maxWidth?: 250) {
    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Добавление максимальной ширины при необходимости
    if (maxWidth) {
        classes.push(`${CN}--maxWidth-${maxWidth}`)
    }

    return makeCN(classes)
}

/**
 * Хук при необходимости устанавливает фокус на поле ввода
 * @param {Object} inputRef
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(inputRef: any, autoFocus: boolean | number) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            inputRef?.current?.focus()
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { inputRef.current.focus() }, autoFocus)
        }
    }, [])
}
