import React, {ReactElement} from 'react'
import { convertToCamelCase } from 'utils/StringUtils'
import {HTMLObjArrType} from './parceComponent/htmlStringToObject'

/**
 * Функция получает массив со структурой HTML и преобразует его в JSX.
 * @param {Object} htmlStructure — объект с разобранной HTML-структурой компонента
 * @param {Number} key — key
 */
export default function createJsxFromComponents(htmlStructure: HTMLObjArrType.Arr, key?: number): ReactElement {
    //@ts-ignore
    return htmlStructure.map((htmlObj, i) => {
        // If it is an empty text component set special sign...
        if ('text' in htmlObj) {
            return handleTextObject(htmlObj)
        }
        else if ('tag' in htmlObj) {
            return handleTagObject(htmlObj, i)
        }

    })
}

function handleTextObject(htmlObj: HTMLObjArrType.Text) {
    return htmlObj.text
}


/**
 * The function parses objects to JSX
 * @param {Object} htmlObj — object with html-structure
 * @param {Number} key — key property
 */
function handleTagObject(htmlObj: HTMLObjArrType.Tag, key: number) {
    setEmptyTextSign(htmlObj)

    let tagName = htmlObj.tag

    // Подготовлю атрибуты
    let attribs = fixAttribs(htmlObj, key);

    // Подготовлю детей
    // @ts-ignore
    let children = (htmlObj.children)
            //@ts-ignore
            ? createJsxFromComponents(htmlObj.children)
            : null

    // Верну созданный компонент Реакта
    return React.createElement( tagName, attribs, children )
}


function setEmptyTextSign(htmlObj: HTMLObjArrType.Tag) {
    if (!htmlObj.attrs['data-em-text-data-comp-id']) return

    // Get the whole text component string
    let commonTextStr = getTextComponentText(htmlObj)
    // Remove all spaces
    const dryTextStr = commonTextStr.replace(' ', '')
    if (!dryTextStr) {
        htmlObj.children = [ getEmptyTextSign() ]
    }
}

function getEmptyTextSign() {
    return {
        tag: 'empty-text-sign',
        attrs: {
            style: `display: inline-block; height: 20px; width: 21px; background-image: url('data:image/svg+xml;utf8,<svg width="21px" height="20px" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg"><path d="M13,19 L13,20 L8,20 L8,19 L13,19 Z M1,15 L1,17.5 L1.00686658,17.64446 C1.07955132,18.4051119 1.72030388,19 2.5,19 L2.5,19 L5,19 L5,20 L2.5,20 L2.33562431,19.9946823 C1.03153594,19.9100387 0,18.8254834 0,17.5 L0,17.5 L0,15 L1,15 Z M21,15 L21,17.5 C21,18.8254834 19.9684641,19.9100387 18.6643757,19.9946823 L18.5,20 L16,20 L16,19 L18.5,19 C19.2796961,19 19.9204487,18.4051119 19.9931334,17.64446 L20,17.5 L20,15 L21,15 Z M17,4 L17,8 L14,8 L14,7 L12,7 L12,13 L14,13 L14,16 L7,16 L7,13 L9,13 L9,7 L7,7 L7,8 L4,8 L4,4 L17,4 Z M16,5 L5,5 L5,7 L6,7 L6,6 L10,6 L10,14 L8,14 L8,15 L13,15 L13,14 L11,14 L11,6 L15,6 L15,7 L16,7 L16,5 Z M1,8 L1,12 L0,12 L0,8 L1,8 Z M21,8 L21,12 L20,12 L20,8 L21,8 Z M5,0 L5,1 L2.5,1 C1.72030388,1 1.07955132,1.59488808 1.00686658,2.35553999 L1,2.5 L1,5 L0,5 L0,2.5 C0,1.1745166 1.03153594,0.089961328 2.33562431,0.00531767968 L2.5,0 L5,0 Z M18.5,0 L18.6643757,0.00531767968 C19.9684641,0.089961328 21,1.1745166 21,2.5 L21,2.5 L21,5 L20,5 L20,2.5 L19.9931334,2.35553999 C19.9204487,1.59488808 19.2796961,1 18.5,1 L18.5,1 L16,1 L16,0 L18.5,0 Z M13,0 L13,1 L8,1 L8,0 L13,0 Z" fill="rgb(60, 60, 60)" fill-rule="nonzero"></path></svg>');`
        }
    }
}

function getTextComponentText(htmlObj: HTMLObjArrType.ArrItem, text: string = '') {
    if ('text' in htmlObj) {
        return text + htmlObj.text
    }
    else if ('children' in htmlObj) {
        let sumText = text
        for (let child of htmlObj.children) {
            sumText = getTextComponentText(child, sumText)
        }
        return sumText
    }
}


/**
 * Функция подготовливает атрибуты текущего элемента
 * @param {Object} htmlObj — object with html-structure
 * @param {Number} key — key
 * @returns {*}
 */
function fixAttribs(htmlObj: HTMLObjArrType.Tag, key: number) {
    const objAttribs = htmlObj.attrs

    // Если атрибутов нет, то вернуть объект с атрибутом key.
    if(!objAttribs) return {
        key: key
    }

    // Переберу объект и заменю названия свойств.
    for(let propName in objAttribs) {

        // Все классы нужно писать как className.
        if(propName === 'class') {
            let classValue = objAttribs.class;
            delete objAttribs.class;
            objAttribs.className = classValue
        }

        if(propName === 'style') {
            // В переменной будет так: box-shadow: 0 30px 55px rgba(0, 0, 0, .2); transform: translateY(5px);
            let styleStr = objAttribs[propName].trim()

            /*[
                "box-shadow: 0 30px 55px rgba(0, 0, 0, .2)",
                "transform: translateY(5px);"
            ]*/
            let styleArr = styleStr.split('; ')

            // Удалю последнюю точку с запятой
            if (styleArr[styleArr.length - 1].endsWith(';')) {
                styleArr[styleArr.length - 1] = styleArr[styleArr.length - 1].slice(0, -1)
            }

            const newStyleArr = styleArr.map((propStyleStr) => {
                let arr = propStyleStr.split(': ')
                return {
                    [convertToCamelCase(arr[0])]: arr[1]
                }
            })

            let styleObj = {}
            for(let styleArrItem of newStyleArr) {
                Object.assign(styleObj, styleArrItem)
            }

            //@ts-ignore
            objAttribs.style = styleObj
        }

        // If inside of the element will be a text component
        if (propName === 'data-em-text-data-comp-id') {
            // Set contentEditable attribute
            objAttribs.contentEditable = ''
        }
    }

    //@ts-ignore
    objAttribs.key = key

    return objAttribs
}
