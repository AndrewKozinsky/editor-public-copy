import { useEffect } from 'react'
import { makeCN } from 'utils/StringUtils'
import { ButtonPropType } from './Button'


/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
export function getButtonClasses(buttonProps: ButtonPropType) {
    const {
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        block,
        big = false,
        align,
        extraClass
    } = buttonProps

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') classes.push(`${CN}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${CN}--base-color`)
    if (color === 'accent') classes.push(`${CN}--accent-color`)

    // Если кнопка должна быть блочным элементом на всю ширину
    if (block) classes.push(`${CN}--block`)
    // Add class if button must be big
    if (big) classes.push(`${CN}--big`)

    if (align) classes.push(`${CN}--${align}`)
    if (extraClass) classes.push(extraClass)

    return makeCN( classes )
}


/**
 * Хук при необходимости устанавливает фокус на кнопку
 * @param {Object} buttonRef
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(buttonRef: any, autoFocus: boolean | number) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            buttonRef.current.focus()
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { buttonRef.current.focus() }, autoFocus)
        }
    }, [])
}
