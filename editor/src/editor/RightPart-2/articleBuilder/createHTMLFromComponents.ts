import {HTMLObjArrType} from './parceComponent/htmlStringToObject'

/**
 * The function gets html structure objects array and turns it to HTML-string
 * @param {Array} htmlStructure — html structure objects array
 */
export default function createHTMLFromComponents(htmlStructure: HTMLObjArrType.Arr): string {

    return htmlStructure.reduce((summaryHtmlStr, htmlObj) => {
        if ('text' in htmlObj) {
            return summaryHtmlStr += htmlObj.text
        }
        else if ('tag' in htmlObj) {
            return summaryHtmlStr += formHtmlStrFromTagObject(htmlObj)
        }
    }, '')
}

/**
 * The function forms tag, its attributes and children
 * @param {Object} htmlObj — object with html-structure
 */
function formHtmlStrFromTagObject(htmlObj: HTMLObjArrType.Tag): string {

    const unpairedTags = ['img', 'hr', 'br', 'b', 'i', 'meta', 'input']

    const tagName = htmlObj.tag
    const attribs = htmlObj.attrs ? getAttribs(htmlObj.attrs) : ''
    const children = (htmlObj.children) ? createHTMLFromComponents(htmlObj.children) : ''

    return unpairedTags.includes(tagName)
        ? `<${tagName} ${attribs} />`
        : `<${tagName} ${attribs}>${children}</${htmlObj.tag}>`
}


/**
 * The function forms tag's attributes string
 * @param {Object} objAttribs — object with html attributes
 * @returns {*} string with html attributes
 */
function getAttribs(objAttribs: HTMLObjArrType.Attrs): string {
    let generalArr: string[] = []

    const unnecessaryProps = ['data-em-data-elem-id', 'data-em-data-comp-id', 'data-em-group', 'data-em-id', 'data-em-text-data-comp-id']

    for(let propKey in objAttribs) {
        if (unnecessaryProps.includes(propKey)) continue

        generalArr.push( propKey + `="${objAttribs[propKey]}"` )
    }

    return generalArr.join(' ')
}
