
/**
 * Function gets string with html code and returns object with html structure
 * @param {String} htmlStr — string with html code
 */
export default function htmlStringToObject(htmlStr: string): HTMLObjArrType.Arr {
    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlStr, 'text/html')
    const elems = doc.body.childNodes

    // Turn HTMLElement to html-object and return it
    return getObjects(elems)
}

/**
 * Function get HTMLElement and turns it to object with html structure
 * @param {NodeListOf} elems — HTMLElements
 */
function getObjects(elems: NodeListOf<ChildNode>): HTMLObjArrType.Arr {
    if (!elems.length) return

    // Returned array of objects
    const arr: HTMLObjArrType.Arr = []

    for (let i = 0; i < elems.length; i++) {
        // If this is tag...
        if (elems[i].nodeType === 1) {
            let elem = elems[i] as Element
            // Get html-object
            const obj = getTag(elem)
            arr.push(obj)
        }
        // If this is text node...
        else if (elems[i].nodeType === 1) {
            let elem = elems[0] as CharacterData
            // Get html-object
            const obj = getText(elem)
            arr.push(obj)
        }
    }

    return arr
}

/**
 * Function creates object with data describes tag
 * @param {Element} elem — Element
 */
function getTag(elem: Element): HTMLObjArrType.Tag {
     const obj: HTMLObjArrType.Tag = {
        tag: elem.tagName.toLowerCase()
    }

    const attrs = getAttrs(elem)
    if (attrs) obj.attrs = attrs

    const children = getChildren(elem)
    if (children) obj.children = children

    return obj
}

/**
 * Function returns object with tag attributes
 * @param {Element} elem — Element
 */
function getAttrs(elem: Element) {
    if (!elem.attributes.length) return null

    const obj: HTMLObjArrType.Attrs = {}

    for (let i = 0; ; i++) {
        const attr = elem.attributes[i]
        if (!attr) break

        obj[attr.name] = attr.nodeValue
    }

    return obj
}

/**
 * Function returns children html-objects
 * @param {Element} elem — Element
 */
function getChildren(elem: Element): HTMLObjArrType.Arr {
    if (!elem.childNodes?.length) return null
    return getObjects(elem.childNodes)
}

/**
 * Function returns text object
 * @param {CharacterData} elem — text node
 */
function getText(elem: CharacterData): HTMLObjArrType.Text {
    let preparedString = elem.data
    // Remove all multiple spaces
    preparedString = preparedString.replace( /\s\s+/g, ' ' )

    return {
        text: preparedString
    }
}


// =============================================================

export namespace HTMLObjArrType {
    export type Arr = ArrItem[]

    export type ArrItem = (Tag | Text)

    export type Tag = {
        tag: string
        dataTagType?: 'comp' | 'elem' // data element id
        dataElemId?: number // data element id
        // dataCompId?: number // data component id
        attrs?: Attrs
        children?: Arr
    }
    export type Text = {
        text: string
    }
    export type Attrs = { [key: string]: string }
}

const dataExample: HTMLObjArrType.Arr = [
    {
        tag: "div",
        attrs: { class: 'grid' },
        children: [
            {
                tag: 'div',
                attrs: {
                    class: 'grid__cell grid__cell--thin',
                    'data-em-group': 'cell-top',
                    'data-em-id': 'cell'
                },
                children: [
                    {text: 'Hello'},
                    {tag: 'p'},
                ]
            },
            {
                tag: 'div',
                attrs: {
                    class: 'grid__cell grid__cell--thick',
                    'data-em-group': 'cell-top',
                    'data-em-id': 'cell'
                },
            }
        ]
    }
]
